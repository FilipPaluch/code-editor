grammar Conditions;

exp
 : expression EOF
 ;

expression
 : bool                                                   #boolx 
 | LPAREN expression RPAREN                               #parenx
 | NOT expression                                         #notx
 | left=equatable op=equality right=equatable             #equalityx
 | left=expression op=equality right=expression           #expressionsequalityx
 | left=comparable op=comparator right=comparable         #comparatorx
 | left=expression op=binary right=expression             #binaryx
 | equatable IS IDENTIFIER LAMBDAARROW LLAMBDAPAREN expression RLAMBDAPAREN
                                                          #lambdax
 ;

number
 : LPAREN number RPAREN                                   #parensx
 | a=number POWER b=number                                #powerx
 | MINUS number                                           #negationx
 | a=number op=(MULTIPLICATION | DIVISION) b=number       #multiplicationx
 | a=number op=(PLUS | MINUS) b=number                    #additionx
 | iterator                                               #numberIteratorx
 | identifier                                             #numberIdentifierx
 | DECIMAL                                                #decimalx
 ;

date
 : DATE LPAREN year=number COMMA month=number COMMA day=number RPAREN
                                                          #dateConstructorx
 | iterator                                               #dateIteratorx
 | identifier                                             #dateIdentifierx
 | TEXT                                                   #dateTextx
 ;

string
 : iterator              #iteratorStringx
 | TEXT                  #textStringx
 | identifier            #identifierStringx
 | UNFINISHED_STRING     #unfinishedStringx
 ;

equatable
 : bool | comparable
 ;

equality
 : EQ | NEQ
 ;

binary
 : AND | OR
 ;

comparable
 : iterator 
 | number 
 | date 
 | identifier
 | TEXT 
 | UNFINISHED_STRING
 ;

iterator
 : (ANY | ALL) OF (array | identifier)
 ;

comparator
 : GT | GE | LT | LE
 ;
 
array
 : LARRAYPAREN arrayelements? RARRAYPAREN
 ;

arrayelements
 : textarrayelement ( COMMA textarrayelement)* 
 | decimalarrayelement ( COMMA decimalarrayelement)*
 ;

textarrayelement
 : identifier
 | TEXT
 ;

decimalarrayelement
 : decimalConst 
 | identifier
 ;

identifier
 : IDENTIFIER
 | identifier COLON IDENTIFIER
 ;

bool
 : TRUE | FALSE
 ;

decimalConst
 : DECIMAL
 | MINUS DECIMAL
 ;

DATE            : [Dd][Aa][Tt][Ee] ;

IS              : [Ii][Ss] ;
OF              : [Oo][Ff] ;
ANY             : [Aa][Nn][Yy] ;
ALL             : [Aa][Ll][Ll] ;
AND             : [Aa][Nn][Dd] ;
OR              : [Oo][Rr] ;
NOT             : [Nn][Oo][Tt];
TRUE            : [Tt][Rr][Uu][Ee] ;
FALSE           : [Ff][Aa][Ll][Ss][Ee] ;

POWER           : '^' ;
MULTIPLICATION  : '*' ;
DIVISION        : '/' ;
PLUS            : '+' ;
MINUS           : '-' ;
GT              : '>' ;
GE              : '>=' ;
LT              : '<' ;
LE              : '<=' ;
EQ              : '=' ;
NEQ             : '!=' ;
LPAREN          : '(' ;
RPAREN          : ')' ;
LARRAYPAREN     : '[' ;
RARRAYPAREN     : ']' ;
LLAMBDAPAREN    : '{' ;
RLAMBDAPAREN    : '}' ;
LAMBDAARROW     : '->' ;
COLON           : ':' ;
COMMA           : ',' ;
DECIMAL         : [0-9]+ ( '.' [0-9]+ )? ;
UNFINISHED_STRING : ['] [a-zA-Z_0-9 \\|^{}~/$:.,%()*?!#&+[\]@-]* ;
TEXT            : ['][a-zA-Z_0-9 \\|^{}~/$:.,%()*?!#&+[\]@-]*['] ;
IDENTIFIER      : [a-zA-Z_.] [a-zA-Z_.0-9]* ;
WS              : [ \r\t\u000C\n]+ -> skip;
ERROR_CHAR      : . ;
