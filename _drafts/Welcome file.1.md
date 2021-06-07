
## How do I show numbers with 5 fixed digits with leading zeroes 
```csharp 
int _num1 = 123; 
int _num2 = 45; 
int _num3 = 123456; 
String.Format("{0:00000}", _num1); //"00123" 
String.Format("{0:00000}", _num2); //"00045" 
String.Format("{0:00000}", _num3); //"123456" 
String.Format("{0:d5}", _num1); //"00123" 
String.Format("{0:d5}", _num2); //"00045" 
String.Format("{0:d5}", _num3); //"123456" 
```
## Can I substitute a string for a value?  Yes: 
```csharp
String.Format("{0:yes;;no}", value)
```
This will print "no" if value is 0, "yes" if value is 1. 
 ## What’s the most efficient way to convert a type into a string? 
 Ans: 
 ```csharp
 double testDouble = 19.95; 
 String testString1 = String.Format("{0:C}", testDouble); // Boxing operation required. 
 String testString2 = testDouble.ToString(”C”); // No boxing operation required. 
 ```
## How can I format as percentage without having the number multiplied by 100? 
  
 Put a single quote (’) before the % in the format string. 
 ```csharp
 myString.Format("{0:##.00′%", 1.23); 
 ```
 This will yield "1.23%". 
 
 ## Can I convert a number with a thousand separator to an int? 
 Ans: Yes - no matter what thousand separator is in use for your locale. 
 ```csharp
 int x = int.Parse("1,345"); // fails int x = int.Parse("1,345",System.Globalization.NumberStyles.AllowThousands) 
 ```
 This gives you an x of 1345. 
 ## How can I use curly brackets within a formatted number? 
 Ans: Yes - doubling them escapes them. 
 For example: string.format("{{SomeString}}={0}","Hello"); 
 will produce: "{SomeString}=Hellow" 
 Q:How can I convert from currency back to a number? 
 Ans: You can add the bitmapped values of the Globalization.NumberStyles enumeration. // format double to currency 
 str = string.Format("{0:c}", pmt); // parse currency formatted string to double 
 double.Parse(str, Globalization.NumberStyles.AllowCurrencySymbol + Globalization.NumberStyles.AllowDecimalPoint + Globalization.NumberStyles.AllowThousands); 
 Q:What’s a good way to format currency? 
 Ans: double val = 4219.6; str = string.Format("{0:$#,#.00;Call Us;Call Us}", val);
 This will return "$4,219.60". The .00 will force 2 decimals and the “;Call Us;Call Us” to show the text “Call Us” in place of negative and null values respectively. (Just in case) 
 Q:How do I format an integer, with commas for thousands? 
 A: string str = string.Format("{0:#,0}", intValue); 
 Q:How can I format a phone number to look like 800.555.1212? 
 A: There’s no direct way to do this; however you can get dashes in the output. 
 So you can do this: string tempStr = String.Format(”{0:###-###-####}”, 8005551212); string result =tempStr.Replace(’-',’.');
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTE1NTM2NTUyLDUwMjA5NjIzMSwtODM1Nz
cxMTkyLC01NTI5OTM0MjYsMTU1MzE2MDY4MCw2NjgxOTAwNDks
MTIwMzA0Njk0NiwxNDA3NTE3MzE1LC0zODQxMDUwMTMsLTMxNT
Y0ODU4OCwtODAwNTYxOTMwLC0xNzI0MjMzMzc2LC0xNTY1NzEz
OTgzLC0yMDY2NjU1NDc1LC05Mzg1MTYyMzgsLTMzMjQ1NTM2M1
19
-->