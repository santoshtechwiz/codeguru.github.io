
## Linq Where equivalent in Ruby

One of the most used (just guessing) LINQ methods would be `Where()`, in .NET allows you to provide a Lambda that is used to filter a collection of objects  
```csharp
 var ints = new[] {
  13, 42, 96, 2, 83
 };
 var evens = ints.Where(x = > x % 2 == 0);
 foreach(int i in evens) {
  Console.WriteLine(i);
 }
```
And in Ruby this functionality would be achieved with `select`.
  
```ruby
ints = [13, 42, 96, 2, 83]
evens = ints.select { | x | x % 2 == 0 }
puts evens
```
## Linq OrderBy expression equivalent in Ruby

To sort a sets of elements in c# with Linq we use OrderBy  
```csharp
var words = new[] {
 "Perl", "c#", "ruby", "java"
};
var ordered = words.OrderBy(x = > x);
ordered.ToList().ForEach(Console.WriteLine);
```
And in Ruby this functionality would be achieved with `sort`.  
```ruby
 words = ["Perl", "c#", "ruby", "java"] 
 ordered = words.sort 
 puts ordered
```
## Linq Select expression equivalent in Ruby

In .NET to convert a set of items to another set one would use the `Select()` method. This method is also useful for creating projections of a collection  
```csharp
 var words = new[] {
  "Hello", "Word"
 };
 var shouting = words.Select(x = > x.ToUpper();
```
and the ruby equivalent is map  
```ruby
words = % w {
 Hello World
}
shouting = words.map { | x | x.upcase
}
puts shouting
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTU0OTI1NDgwMSwxOTQ1NTM3MTI3LC0xOD
k0MTk5NDMzLDUwMjA5NjIzMSwtODM1NzcxMTkyLC01NTI5OTM0
MjYsMTU1MzE2MDY4MCw2NjgxOTAwNDksMTIwMzA0Njk0NiwxND
A3NTE3MzE1LC0zODQxMDUwMTMsLTMxNTY0ODU4OCwtODAwNTYx
OTMwLC0xNzI0MjMzMzc2LC0xNTY1NzEzOTgzLC0yMDY2NjU1ND
c1LC05Mzg1MTYyMzgsLTMzMjQ1NTM2M119
-->