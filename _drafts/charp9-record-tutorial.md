
Using the static String.Join method is a quick way to get a comma-delimited string. (I used to always run the array through a foreach loop tacking on a comma, and then removing the last comma outside the foreach loop--a bit messy). This code shows you how to take an array and convert it into a string delimited by commas in one nline. Of course, you can delimit your string with any character you want.

```csharp
public string ToCSV()
{
	string[] ids = {"2343","2344","2345"};
	string idString = String.Join(",",ids);
	return idString;
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbNjgyNjk0MzgsMTUyMzM5MTExMCwtMTQyOT
k2MjE5NCw2NDc5NzU2MTYsLTE1MDIyODUyODZdfQ==
-->