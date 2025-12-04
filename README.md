# AI Code Editor – Custom DSL Editor Powered by AI, Monaco & ANTLR4

🔗 **Live Demo:** https://code-editor.fpaluch92.workers.dev/

A sophisticated, production-ready code editor built on Monaco Editor (VS Code engine) with a custom **ANTLR4-powered language engine**.  
Create domain-specific languages (DSL) with full IDE-like features including intelligent autocompletion, real-time validation, semantic analysis, and AI-powered code assistance.

## 🤖 AI-First

https://github.com/user-attachments/assets/0d82621f-cdfe-4828-8949-17dd6cd71ea7

## 📝 Traditional way

https://github.com/user-attachments/assets/ea9cb418-b299-4fd7-b8f8-d7160c516ca6


## 🚀 Key Features

- 🔤 **Custom DSL Support** – Define your own programming languages using ANTLR4 grammars  
- 🧠 **Intelligent IntelliSense** – Context-aware autocompletion with field suggestions
- ⚡ **Real-time Validation** – Live error detection with precise diagnostics and error recovery  
- 🔍 **Semantic Analysis** – Deep code understanding  
- 🤖 **AI Integration** – AI-powered code generation and suggestions with diff-based approval   
- 📝 **Rich Language Features** – Syntax highlighting, hover tooltips, bracket matching, and code snippets  
- 🎯 **Domain-Driven** – Configurable input field schemas with dropdown options, collections, and validation rules  

## 📊 Use Cases

- Custom Business Rules Engines  
- Data Mapping & Transformation Pipelines (ETL/ELT)  
- No-Code / Low-Code Platforms  
- Analytics, Reporting & Query Builders  

## 🤖 AI-First – Natural Language to Code

### Overview

The AI integration enables users to write code using natural language descriptions.  
Instead of learning complex DSL syntax, users can describe their requirements in plain text, and the AI automatically generates the corresponding code, validates it, and suggests improvements.

### How It Works

#### 1. Context-Aware AI Assistant

When a user types a natural language request, the editor automatically provides the AI with complete context about the custom language:

- **Complete ANTLR4 Grammar** – The AI receives the full grammar definition, understanding exactly how expressions, lambda functions, operators, and all language constructs work  
- **Available Field Schema** – All accessible fields, their types, dropdown options, collection properties, and validation rules  
- **Current Code Context** – The existing code, cursor position, and surrounding expressions for contextual understanding  
- **Domain Model** – Business-specific field meanings and relationships  

#### 2. Intelligent Code Generation

The AI leverages this rich context to:

- **Generate Syntactically Correct Code** – Understanding the grammar ensures all generated expressions follow proper DSL syntax rules  
- **Use Valid Field References** – Only suggests fields that actually exist in the domain schema  
- **Respect Type Constraints** – Generates appropriate comparisons, operators, and values based on field types  
- **Handle Complex Logic** – Creates sophisticated lambda expressions, nested conditions, and iterator patterns  

#### 3. Real-Time Validation & Correction

Generated code is immediately validated by the same ANTLR4 engine that powers the editor:

- **Automatic Error Detection** – Any syntax or semantic errors are caught instantly  
- **AI Self-Correction** – When validation fails, the AI receives detailed error feedback and automatically fixes the code  
- **Schema Compliance** – Ensures all field references, dropdown values, and data types match the domain model  

## 🗣 Natural Language Examples

### Simple Conditions

- **"Write a condition that returns orders where the status is 'paid'."**  
  → `order.status = 'paid'`

- **"Create a condition for orders created on 2024-01-15."**  
  → `order.date = DATE(2024, 1, 15)`


### Complex Lambda Expressions

- **"Return orders where at least one item has category 'electronics'."**  
  → `ANY OF order.items IS item -> { item.category = 'electronics' }`

- **"Build a condition for users that own at least one device with OS 'windows'."**  
  → `ANY OF user.devices IS device -> { device.os = 'windows' }`


### Multi-Condition Logic

- **"Select shipped orders that contain at least one item in category 'electronics' with a price over 100."**  
  →  
  `order.status = 'shipped' AND ANY OF order.items IS item -> { item.category = 'electronics' AND item.unitPrice > 100 }` 

## 🤖 AI Capabilities

### Code Generation

Transform natural language descriptions into valid DSL expressions, handling complex nested logic and lambda functions automatically.

### Code Validation

Analyze existing code for syntax errors, semantic issues, and domain model violations, providing detailed explanations and fix suggestions.

### Code Optimization

Suggest performance improvements, simplify complex expressions, and recommend best practices for the specific domain.

### Interactive Learning

The AI learns from the specific grammar and field schema, becoming increasingly accurate for domain-specific terminology and patterns.

### Diff-Based Workflow

All AI suggestions are presented through Monaco's built-in diff editor:

- Side-by-side comparison of original and suggested code  
- Accept/reject workflow with keyboard shortcuts  
- Partial acceptance of specific changes  
- Undo capability to revert AI modifications  

## How the ANTLR4-based engine works

### Multiple IF/THEN blocks and separate grammars

The editor does not treat the document as a single IF/THEN pair, but as a **sequence of independent conditional mappings**:

- each `#IF` begins a new condition block  
- each corresponding `#THEN` defines the mapping block  
- the script may contain **any number of such pairs**, one after another  

Each of these blocks is handled using its **own grammar and parsing pipeline**.  
The condition part (`#IF`) is parsed using a **Condition Grammar**, while the mapping part (`#THEN`) is parsed using a completely separate **Mapping Grammar**.  

This means that inside one editor you effectively have **two different languages**, each with its own syntax, rules, and error handling, but working together to express full conditional mapping logic.

### What is ANTLR4 and why this project uses it?

ANTLR4 is a parser generator for building custom languages based on formal grammars.  
A grammar defines:

- how tokens such as identifiers, operators, and literals are recognized,  
- how these tokens combine into expressions, comparisons, lambdas, arrays, etc.,  
- how precedence, nesting and valid constructs are enforced.

From that grammar ANTLR4 generates a full lexer and parser that can turn free-form text into a structured syntax tree.

**Why ANTLR4 fits this editor especially well:**

- It produces precise, deterministic parse trees, even for partially written or invalid input.  
- It supports complex constructs such as lambdas, nested expressions, iterators, arrays, date constructors, and custom operators.  
- It is easy to extend — adding a new operator or expression type is as simple as updating the grammar.  
- It provides great error recovery, which is crucial when parsing on every keystroke in an editor.  
- The generated parse tree gives us rich structural information that Monaco alone cannot provide.

**In short:** Monaco handles the UI of a code editor; ANTLR4 gives it a real language underneath.

### Why ANTLR4 works particularly well with Monaco

Monaco (the editor behind VS Code) knows how to:

- highlight text,  
- show suggestions,  
- render diagnostics,  
- manage cursors and tokens.

But Monaco has **no built-in understanding of any language**.

ANTLR4 fills that gap by generating:

- a complete syntactic model of the user’s code,  
- the exact ranges and types of every token and expression,  
- a recoverable parse tree for incomplete input,  
- the structure needed to build semantic rules (validation, inference, type expectations, etc.).

This partnership is what allows the editor to provide:

- smart autocompletion,  
- contextual validation,  
- precise error messages,  
- code insights (expected types, allowed fields, lambda variable scopes, etc.),  
- and AI suggestions with diff previews.

## From text to semantic model

Instead of building a classic tree-shaped AST and walking it ad-hoc, the engine does something more editor-friendly:

1. **Parse with ANTLR4**  
   The IF or THEN section is parsed into a concrete syntax tree using the corresponding grammar.

2. **Visit and flatten expression elements**  
   A custom visitor walks the parse tree and turns it into a flat stream of “expression elements”:  
   identifiers, operators, literals, function calls, brackets, lambda bodies, etc.

   Each element knows:  
   - its exact character range in the original text  
   - what kind of thing it represents (field, operator, keyword, value, function, etc.)  
   - how it relates to surrounding elements (e.g. part of a comparison, inside a lambda, inside an array literal…)

   This flattening step provides a **uniform intermediate representation** that the rest of the system uses for:
   - semantic validation  
   - providing intelligent autocomplete  
   - cursor-aware context lookup  
   - constructing Monaco tokens  
   - building higher-level contexts (comparison, lambda, iterator, arithmetic expression, etc.)  
   - attaching diagnostics  

```ts
it('ALL OF items IS x -> { x > 5 }', () => {
    const visitor = new ConditionExpressionElementsVisitor();
    const result = visitor.parse('ALL OF items IS x -> { x > 5 }');

    expect(result).toMatchObject({
        isValid: true,
        elements: [
            elem(1, 'ALL', ElementType.KEYWORD, 0, 2),
            elem(12, ' ', ElementType.WHITESPACE, 3, 3),
            elem(2, 'OF', ElementType.KEYWORD, 4, 5),
            elem(13, ' ', ElementType.WHITESPACE, 6, 6),
            elem(3, 'items', ElementType.IDENTIFIER, 7, 11),
            elem(14, ' ', ElementType.WHITESPACE, 12, 12),
            elem(4, 'IS', ElementType.KEYWORD, 13, 14),
            elem(15, ' ', ElementType.WHITESPACE, 15, 15),
            elem(5, 'x', ElementType.IDENTIFIER, 16, 16, true, undefined, {
                type: 'lambda_variable',
                role: 'definition'
            }),
            elem(16, ' ', ElementType.WHITESPACE, 17, 17),
            elem(6, '->', ElementType.LAMBDA_ARROW, 18, 19),
            elem(17, ' ', ElementType.WHITESPACE, 20, 20),
            elem(7, '{', ElementType.BRACKET_OPEN, 21, 21),
            elem(18, ' ', ElementType.WHITESPACE, 22, 22),
            elem(8, 'x', ElementType.IDENTIFIER, 23, 23, true, undefined, {
                type: 'lambda_variable',
                role: 'reference'
            }),
            elem(19, ' ', ElementType.WHITESPACE, 24, 24),
            elem(9, '>', ElementType.OPERATOR_COMPARISON, 25, 25),
            elem(20, ' ', ElementType.WHITESPACE, 26, 26),
            elem(10, '5', ElementType.LITERAL_NUMBER, 27, 27),
            elem(21, ' ', ElementType.WHITESPACE, 28, 28),
            elem(11, '}', ElementType.BRACKET_CLOSE, 29, 29)
        ],
        contexts: [
            {
                id: 1,
                type: ContextType.COMPARISON,
                elementIds: [8, 19, 9, 20, 10],
                position: { start: 23, end: 27 },
                isComplete: true,
                metadata: {
                    type: 'comparison',
                    operatorId: 9,
                    elementsForLeftOperand: [8],
                    elementsForRightOperand: [10]
                }
            },
            {
                id: 2,
                type: ContextType.LAMBDA,
                elementIds: [
                    1, 12, 2, 13, 3, 14, 4, 15, 
                    5, 16, 6, 17, 7, 18, 8, 19, 
                    9, 20, 10, 21, 11
                ],
                position: { start: 0, end: 29 },
                isComplete: true,
                metadata: {
                    type: 'lambda',
                    collectionElementId: 3,
                    variableElementId: 5,
                    arrowElementId: 6,
                    openBraceElementId: 7,
                    closeBraceElementId: 11
                }
            }
        ],
        diagnostics: []
    });
});

```

4. **Analyze the position of the cursor**  
   Given a cursor position, the analyzer finds the element(s) that cover that position and derives a **position context**, such as:
   - “inside an identifier”,  
   - “right after a dot in a field path”,  
   - “inside a lambda body”,  
   - “inside a comparison operator”,  
   - “inside an array literal”, etc.

   It also computes:
   - which fields are valid here,  
   - which operators or functions make sense at this spot,  
   - what type (text/number/boolean/date) is expected.

   That same context is used both for autocompletion and for validation.

   ```ts
        it('should build stack for nested lambdas when cursor is in inner lambda', () => {
            const { expression, cursorPosition } = parseExpressionWithCursor(
                'ANY OF user.orders IS x -> { ANY OF project.members IS y -> { y:userId = | } }'
            );
            const parseResult = visitor.parse(expression);
        
            const stack = lambdaContextBuilder.buildLambdaStackForCursorPosition(
                cursorPosition,
                parseResult
            );
        
            expect(stack).toEqual([
                {
                    variable: 'x',
                    collectionField: expressionFields.get('user.orders'),
                    level: 0
                },
                {
                    variable: 'y',
                    collectionField: expressionFields.get('project.members'),
                    level: 1
                }
            ]);
        });
    
       it('should return next nodes for property also when lambda is not closed', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor(
            'ANY OF user.orders IS x -> { x:item.| '
        );
        const result = analyzer.analyze(expression, cursorPosition);
    
        expect(result.positionContext.contextType).toBe(AnalysisContextType.LAMBDA_IDENTIFIER);
        expect(result.positionContext.availableFields).toEqual([
            {
                name: 'name',
                value: 'name',
                fullPath: 'item.name',
                type: FieldType.FIELD,
                insertText: 'name'
            },
            {
                name: 'type',
                value: 'type',
                fullPath: 'item.email',
                type: FieldType.FIELD,
                insertText: 'type'
            }
        ]);
    });
   ```

6. **Validate against the domain model**  
   The validator walks through the analyzed elements and checks them against the domain model (the set of available fields, dropdown options, collections and read-only flags).  
   This produces precise diagnostics such as:
   - unknown field or path  
   - using a collection where a scalar value is expected  
   - using a wrong dropdown value  
   - assigning to a read-only field  
   - mismatched types in comparisons and expressions  

   Each error is mapped back to the original character ranges, so Monaco can underline exactly the problematic fragment.

   ```ts
           it('should validate property not in collection', () => {
            const { expression } = parseExpressionWithCursor('ANY OF user.orders IS x -> { x:badprop = | }');
            const result = validator.validate(expression);

            expect(result.errors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        type: 'parsing_error'
                    }),
                    {
                        type: 'property_not_in_collection',
                        message: 'Property "badprop" is not available in collection "user.orders"',
                        lambdaVariable: {
                            value: 'x',
                            range: { start: 31, end: 31 }
                        },
                        property: {
                            value: 'badprop',
                            range: { start: 33, end: 39 }
                        },
                        collection: {
                            value: 'user.orders',
                            range: { start: 7, end: 19 }
                        }
                    }
                ])
            );

            expect(result.annotations).toEqual([]);
        });
   ```
   
8. **Generate editor features on top of that model**  
   With the semantic model in place, the editor can:
   - offer context-aware completions (fields, operators, functions, lambda snippets…)  
   - propose valid dropdown values at the right spot  
   - highlight the syntax by token type  
   - show hover tooltips and function signatures  
   - drive the diff view when AI proposes changes  

