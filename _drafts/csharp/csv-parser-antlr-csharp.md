# Parsing CSV using ANTLR in c#

This blog post will show you how to parse the CSV file using ANTLR in C#. CSV is a very popular format for transfering the data. There are a lot of C# csv parser aviable on the internet but you can easily create your own csv parser in C#. For this post I am using ANTLR which is very popular tool for generating lexer and parser based on the EBNF grammar.

> In computer-based language recognition, ANTLR, or ANother Tool for Language Recognition, is a parser generator that uses LL for parsing. ANTLR is the successor to the Purdue Compiler Construction Tool Set, first developed in 1989, and is under active development.

## Why need CSV Parser?

**CSV**  format is a plain text format in which values are separated by commas (Comma Separated Values) to display or stored the data in the database. We need a parser that reads the data and converts it to C# POCO objects to transfer it to the NoSQL database.

## Antlr supports the following things.

1.  Tree construction
2.  Tree walking
3.  Error recovery
4.  Error handling
5.  Translation

# How ANTLR Works?

![Parsing csv using ANTLR in c# with example](https://1.bp.blogspot.com/-7q8itmGrbW0/X13O7uWhSAI/AAAAAAAAM1o/ZvuEVTcks6gsK1QEySukEdN0Fo20SIWRACLcBGAsYHQ/w640-h186/process-lexing.png)

On a high level, here’s what you do to parse something with ANTLR:

1.  Create lexer rules in your grammar
2.  Create parser rules that use a lexer output
3.  Use lexer and parser to generate source code for a target language like in our case Csharp.
4.  Use generated sources to convert some raw input into the structured form (AST)
5.  Do something with this structured data.

Before going to coding, make sure you have installed the following Visual Studio Code Extension.

[ANTLR4 grammar syntax support](https://www.blogger.com/blog/post/edit/6673695286148904603/8590414430090970718#)

## STEP1

Create a console application in .net core by running the following command from the command prompt

```cmd
dotnet new console


```

## STEP2

Add  `ANTLR`  NuGet package by running the following command

```cmd
dotnet add package Antlr4.Runtime.Standard --version 4.8.0


```

## STEP3

Create a new file  `CSV.g4`  and add the following grammar

```antlr

grammar CSV;
options{
  language='CSharp'
}
csvFile: hdr row+ ;
hdr : row ;

row : field (',' field)* '\r'? '\n' ;

field
    : TEXT
    | STRING
    |
    ;

TEXT   : ~[,\n\r"]+ ;
STRING : '"' ('""'|~'"')* '"' ; // quote-quote is an escaped quote


```

If you save this file, ANTLR extensions will generate the following C# file in the current folder.

-   CSVBaseListener.cs
-   CSVBaseVisitor.cs
-   CSVLexer.cs
-   CSVParser.cs
-   CSVVisitor.cs

If you parse the following CSV file with the grammar, you will see the parse tree below.

```csv
a,b,c


```

![](https://1.bp.blogspot.com/-kqKPYVQpE-4/X120rfHZB7I/AAAAAAAAM1c/rac0lcLYtGcgthX7URVxQEHNQmy7wVvdwCLcBGAsYHQ/w640-h314/csv.PNG)

AST

## STEP 5

Now it’s time to parse the CSV data. First, we will create a custom listener and store the parse result in the data structure to parse the CSV data.

Create a class MyCSVListener and inherits from the class  `CSVBaseListener`  and  `override`  the following three methods.

> The methods what would interest are, for example where the parser enters and exits different contexts specified in the grammar.

-EnterRow  
-either  
-ExitField

```csharp
using System.Collections.Generic;
using Antlr4.Runtime.Misc;

public class MyCSVListener : CSVBaseListener
{

    private List<string> _header;
    private List<string> _currentRow;
    private List<List<string>> result;

    public List<List<string>> Result { get => result; set => result = value; }

    public MyCSVListener()
    {        Result=new List<List<string>>();
    }

    public override void EnterRow([NotNull] CSVParser.RowContext context)
    {
        _currentRow = new List<string>();
    }
    public override void ExitRow([NotNull] CSVParser.RowContext context)
    {
        if (context.Parent.RuleIndex == CSVParser.RULE_hdr)
        {
            return;
        }
       
        var m = new List<string>();
        int i = 0;
        foreach (var row in _currentRow)
        {
            m.Add(row);
            i++;
        }
        Result.Add(m);

    }

    public override void ExitHdr([NotNull] CSVParser.HdrContext context)
    {
        _header = new List<string>();
        _header.AddRange(_currentRow);
    }
    public override void ExitField([NotNull] CSVParser.FieldContext context)
    {
        _currentRow.Add(context.TEXT().GetText());
    }
 
}


```

Now it’s time to test the method. Open  `Program.cs`  and add the following code snippet. The code is self-explanatory.

```csharp
using System;
using System.IO;
using Antlr4.Runtime;
using Antlr4.Runtime.Tree;
using System.Linq;
using System.Linq.Expressions;
namespace AntlrCSVParser
{
    class Program
    {
        static void Main(string[] args)
        {
            var csv = File.ReadAllText("input.txt");
            AntlrInputStream inputStream = new AntlrInputStream(csv);
            CSVLexer lexer = new CSVLexer(inputStream);
            CommonTokenStream commonTokenStream = new CommonTokenStream(lexer);
            CSVParser parser = new CSVParser(commonTokenStream);
            // Walk it and attach our listener
            ParseTreeWalker walker = new ParseTreeWalker();
            MyCSVListener listener = new MyCSVListener();

            walker.Walk(listener, parser.csvFile());
            var data = listener.Result;
            foreach (var list in data)
            {

                foreach (var row in list)
                {
                    System.Console.Write(row + " ");
                }
                System.Console.WriteLine();
            }

        }
    }
}


```

## CSV

```csv
firstname,lastname,age
santosh,singh,21
john,doe,22
bill,gates,35
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTI3MzI1ODMwNF19
-->