# What is design pattern
>Design pattern is occuring sollution to the problem that occurs during software design.

In this article we are going to discuss about `Command` design pattern.
## Decorator Design pattern
The command pattern is a behavioral design pattern. The pattern encapuslates  a request as an object that contains all the information about the request, including requests for queues or logs, allowing for much more complex architectures. It even allows operations like `undo` and `redo`.

Let's consider the scenario where you are devloping the an application and when user exit the application you want to present user to option that do you want to `save`,`close` or `save and close` the application. This problem is the perfect candidate for the `command ` design patterm.

![](https://upload.wikimedia.org/wikipedia/commons/5/52/Command_design_pattern.png)

- Create a class named `Command` and add one abstract method `Execute` as shown below
	 ```csharp
			public abstract class Command
			{
				public abstract void Execute();
			}```
- Create three sub classes of `Command` named `ExitCommand`,`SaveCommand` and `SaveAndCloseCommand` and inhrits these from `Command` base class.
```csharp
public class SaveCommand : Command
{
	public override void Execute()
	{
		Console.WriteLine("Your work saved!");
	}

}

public class ExitCommand : Command
{
	public override void Execute()
	{
		Console.WriteLine("Closing The Application!");
	}
}
public class SaveAndCloseCommand : Command
{
    private SaveCommand _save;
	private ExitCommand _exit;
	public SaveAndCloseCommand()
	{
		_save=new SaveCommand();
		_exit=new ExitCommand();
	}
	public override void Execute()
	{
		_save.Execute();
		_exit.Execute();
		//Console.WriteLine("Save and Close");
	}
}
```
- Now create a class `Application` as shown below
```csharp


public class Application
{
	private List<Command> _commands;
	private Command _command;
	public Application()
	{
	   _commands=new List<UserQuery.Command>();
	}
	public void SetCommand(Command command){
		_commands.Add(command);
		_command=command;
		
	}
	public void Execute()
	{
		this._command.Execute();
	}
}
```
- To use the API application in your application. 
```csharp
void Main()
{
	var response=Console.ReadLine();
	var app = new Application();
	switch (response)
	{
		case "s":
			app.SetCommand(new SaveCommand());
			break;
		case "c":
			app.SetCommand(new ExitCommand());
			break;
		case "sc":
			app.SetCommand(new SaveAndCloseCommand());
			break;
		default:
			Console.WriteLine("Invalid command");
			break;
		
				
	}
	
	
	app.Execute();
}
```

<!--stackedit_data:
eyJoaXN0b3J5IjpbMjA0ODQyMjIsODkxNDYzOTUsMTE4ODMwND
YzMV19
-->