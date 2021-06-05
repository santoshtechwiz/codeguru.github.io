
In this article, I will show how to find nth highest salary using LINQ. This is a very popular SQL interview question. The purpose of this article is to show you the LINQ operator that we can use to achieve the goal, not the right solution to the problem.

## Solution
1. Sort the collection by salary in Descending Order
2. Skip the nth-1 result
3. Take the first item from the filtered collection




![](https://lh3.googleusercontent.com/-HfqCAPELI6E/XqauejoMbQI/AAAAAAAAMRg/8Ybu-8Ocwm49205SaHy4ItH-hs9idadlgCLcBGAsYHQ/h120/linq_nth_salary.png)
```csharp
int nthSalary=2;
var result=
	Salaries
	.OrderByDescending(s => s.Salary)
	.Skip(nthSalary-1)
	.Take(1)
	.FirstOrDefault();
	
	Console.WriteLine(result.Salary);
	
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbNDAwNTI1NzA5LDg1MzExODE1M119
-->