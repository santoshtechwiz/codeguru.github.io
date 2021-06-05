In this post I will show you how to write a simple DSL in C# using ANTLR.

# What is DSL?
>A domain-specific language is a computer language specialized to a particular application domain. This is in contrast to a general-purpose language, which is broadly applicable across domains.

# What is ANTLR?
>In computer-based language recognition, ANTLR, or ANother Tool for Language Recognition, is a parser generator that uses LL for parsing. ANTLR is the successor to the Purdue Compiler Construction Tool Set, first developed in 1989, and is under active development
# What are we going to build
In this article, I will show you how convert `CSV` to `JSON` using ANTLR and node.js

>INPUT
```json
REVIEW_DATE, AUTHOR, ISBN, DISCOUNTED_PRICE
1985/01/21, Douglas Adams, 0345391802, 5.95
1990/01/12, Douglas Hofstadter, ,
```

>OUTPUT
```json
[
  {
    REVIEW_DATE: '1985/01/21',
    AUTHOR: 'Douglas Adams',
    ISBN: '0345391802',
    DISCOUNTED_PRICE: '5.95'
  },
  {
    REVIEW_DATE: '1990/01/12',
    AUTHOR: 'Douglas Hofstadter',
    ISBN: '',
    DISCOUNTED_PRICE: ''
  }
]
```
# Prerequiste
- You  must know how to use ANTLR and generate Lexer and Parser. If you don'nt know follow this link [ The ANTLR Mega Tutorial](https://tomassetti.me/antlr-mega-tutorial/)

Let's start writing the grammar for parsing the CSV file.

```bash
grammar CSV;
options{
    language='JavaScript';
}

csvFile: hdr row+ ;
hdr : row ;
row : field (',' field)* '\r'? '\n' ;
field
    : TEXT
    | STRING
    |   // empty string
    ;

TEXT   : ~[,\n\r"]+ ;
STRING : '"' ('""'|~'"')* '"' ; // quote-quote is an escaped quote
```
Grammar is very simple. Now we will generate lexer and parser by running the following command

```bash
antlr CSV.g4
```
If command run successfflly we wil c
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE0MDQxOTU0MTUsNzMwOTAzNDA3XX0=
-->