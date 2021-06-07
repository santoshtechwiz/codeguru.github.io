
#### Linq Where equivalent in Ruby

One of the most used (just guessing) LINQ methods would be `Where()`, in .NET allows you to provide a Lambda that is used to filter a collection of objects  

 var ints = new[] {
  13, 42, 96, 2, 83
 };
 var evens = ints.Where(x = > x % 2 == 0);
 foreach(int i in evens) {
  Console.WriteLine(i);
 }

And in Ruby this functionality would be achieved with `select`.  

ints = [13, 42, 96, 2, 83]
evens = ints.select { | x | x % 2 == 0 }
puts evens

#### Linq OrderBy expression equivalent in Ruby

To sort a sets of elements in c# with Linq we use OrderBy  

var words = new[] {
 "Perl", "c#", "ruby", "java"
};
var ordered = words.OrderBy(x = > x);
ordered.ToList().ForEach(Console.WriteLine);

And in Ruby this functionality would be achieved with `sort`.  

 words = ["Perl", "c#", "ruby", "java"] 
 ordered = words.sort 
 puts ordered

#### Linq Select expression equivalent in Ruby

In .NET to convert a set of items to another set one would use the `Select()` method. This method is also useful for creating projections of a collection  

 var words = new[] {
  "Hello", "Word"
 };
 var shouting = words.Select(x = > x.ToUpper();

and the ruby equivalent is map  

words = % w {
 Hello World
}
shouting = words.map { | x | x.upcase
}
puts shouting
<!--stackedit_data:
eyJoaXN0b3J5IjpbMjA2MDMzMTQ2LDE5NDU1MzcxMjcsLTE4OT
QxOTk0MzMsNTAyMDk2MjMxLC04MzU3NzExOTIsLTU1Mjk5MzQy
NiwxNTUzMTYwNjgwLDY2ODE5MDA0OSwxMjAzMDQ2OTQ2LDE0MD
c1MTczMTUsLTM4NDEwNTAxMywtMzE1NjQ4NTg4LC04MDA1NjE5
MzAsLTE3MjQyMzMzNzYsLTE1NjU3MTM5ODMsLTIwNjY2NTU0Nz
UsLTkzODUxNjIzOCwtMzMyNDU1MzYzXX0=
-->