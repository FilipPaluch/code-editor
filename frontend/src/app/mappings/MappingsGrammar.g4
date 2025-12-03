grammar MappingsGrammar;

exp
 : mapping EOF
 ;

mapping
 : output ASSIGN expression END?               #basicMapping
 | output CONDITIONALASSIGN input END?         #conditionalMapping
 | mapping END mapping                         #manyMappings
 ;

expression
 : constant 
 | input 
 | nullCoalescing
 | indexer
 | array 
 | roundedNumber
 | date
 | formatExpression
 | NULL
 ;

formatExpression
 : FORMAT LPAREN value=input COMMA dateFormat=input RPAREN #formatExpressionVarDateFormat
 | FORMAT LPAREN value=input COMMA dateFormat=TEXT RPAREN #formatExpressionConstDateFormat
 ;

nullCoalescing
 : input (nullCoalescingRightSide)+ 
 | LPAREN nullCoalescing RPAREN
 ;

nullCoalescingRightSide
 : NULLCOALESCING (input | constant | NULL)
 ;

roundedNumber
 : number
 ;

number
 : LPAREN number RPAREN                                 #parensx
 | a=number POWER b=number                              #powerx
 | MINUS number                                         #negationx
 | a=number op=(MULTIPLICATION | DIVISION) b=number     #multiplicationx
 | a=number op=(PLUS | MINUS) b=number                  #additionx
 | nullCoalescing                                       #mathNullCoalescingx
 | DECIMAL                                              #decimalx
 | input                                                #mathIdentifierx
 | LENGTH LPAREN input RPAREN                           #lengthx
 | COUNT LPAREN (array | input) RPAREN                  #countx
 ;

date
 : nullCoalescing                                      #dateNullCoalescingx
 | TEXT                                                #dateTextx
 | input                                               #dateIdentifierx
 ;

indexer
 : (array | input) LARRAYPAREN index=number RARRAYPAREN
 ;

array
 : LARRAYPAREN arrayElements? RARRAYPAREN
 ;

arrayElements
 : expression ( COMMA expression)*
 ;
   
constant 
 : DECIMAL
 | MINUS DECIMAL
 | TEXT 
 | BOOL
 ;

input
 : IDENTIFIER
 ;

output
 : IDENTIFIER
 ;


NULL                : [Nn][Uu][Ll][Ll] ;
NULLCOALESCING      : '??' ;
ASSIGN              : ':=' ;
CONDITIONALASSIGN   : ':?=' ;
END                 : ';'  ;

FORMAT              : [Ff][Oo][Rr][Mm][Aa][Tt] ;
LENGTH              : [Ll][Ee][Nn][Gg][Tt][Hh] ;
COUNT               : [Cc][Oo][Uu][Nn][Tt] ;

BOOL                : TRUE | FALSE ;
fragment TRUE	    : [Tt][Rr][Uu][Ee] ;
fragment FALSE	    : [Ff][Aa][Ll][Ss][Ee] ;

POWER               : '^' ;
MULTIPLICATION      : '*' ;
DIVISION            : '/' ;
PLUS			    : '+' ;
MINUS			    : '-' ;
LPAREN			    : '(' ;
RPAREN			    : ')' ;
LARRAYPAREN		    : '[' ;
RARRAYPAREN		    : ']' ;
COLON               : ':' ;
COMMA              	: ',' ; 

DECIMAL             : [0-9]+ ( '.' [0-9]+ )? ;
UNFINISHED_STRING   : ['] [a-zA-Z_0-9 \\|^{}~/$:.,%()*?!#&+[\]@-]* ;
TEXT                : ['][a-zA-Z_0-9 \\|^{}~/$:.,%()*?!#&+[\]@-]*['] ;
IDENTIFIER          : [a-zA-Z_.] [a-zA-Z_.0-9]* ;

WS                  : [ \r\t\u000C\n]+ -> skip;
ERROR_CHAR          : . ;
