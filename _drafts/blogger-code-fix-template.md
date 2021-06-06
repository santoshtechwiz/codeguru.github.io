Sometimes, you find the need to parse CSV files dynamically into a DataTable. CSV files can be simple or complex. The simple CSV file would just have the fields separated by commas. Complexity comes in when the data itself has embedded commas, quotes or line breaks. This solution, written in C#, and using the .NET Framework’s Regular Expression object can handle such complex data. This has been tested to work with CSV formatted files saved from Microsoft Excel.

To begin with, make sure that you have the following namespaces:

```csharp
using System.Data;
using System.IO;
using System.Text.RegularExpressions;
Next, we build a function that parses any CSV input string into a DataTable:

public static DataTable ParseCSV(string inputString)
{

    DataTable dt = new DataTable();
    // declare the Regular Expression that will match versus the input string
    Regex re = new
Regex("((?<field>[^\",\\r\\n]+)|\"(?<field>([^\"]|\"\")+)\")(,|(?<rowbreak>\\r\\n|\\n|$))");

    ArrayList colArray = new ArrayList();
    ArrayList rowArray = new ArrayList();

    int colCount = 0;
    int maxColCount = 0;
    string rowbreak = "";
    string field = "";

    MatchCollection mc = re.Matches(inputString);
    foreach (Match m in mc)
    {

        // retrieve the field and replace two double-quotes with a single double-quote
        field = m.Result("${field}").Replace("\"\"", "\"");

        rowbreak = m.Result("${rowbreak}");

        if (field.Length > 0)
        {
            colArray.Add(field);
            colCount++;
        }

        if (rowbreak.Length > 0)
        {

            // add the column array to the row Array List
            rowArray.Add(colArray.ToArray());

            // create a new Array List to hold the field values
            colArray = new ArrayList();

            if (colCount > maxColCount)
                maxColCount = colCount;

            colCount = 0;
        }
    }

    if (rowbreak.Length == 0)
    {
        // this is executed when the last line doesn't
        // end with a line break
        rowArray.Add(colArray.ToArray());
        if (colCount > maxColCount)
            maxColCount = colCount;
    }

    // create the columns for the table
    for (int i = 0; i < maxColCount; i++)
        dt.Columns.Add(String.Format("col{0:000}", i));
    // convert the row Array List into an Array object for easier access
    Array ra = rowArray.ToArray();
    for (int i = 0; i < ra.Length; i++)
    {

        // create a new DataRow
        DataRow dr = dt.NewRow();

        // convert the column Array List into an Array object for easier access
        Array ca = (Array)(ra.GetValue(i));

        // add each field into the new DataRow
        for (int j = 0; j < ca.Length; j++)
            dr[j] = ca.GetValue(j);

        // add the new DataRow to the DataTable
        dt.Rows.Add(dr);
    }

    // in case no data was parsed, create a single column
    if (dt.Columns.Count == 0)
        dt.Columns.Add("NoData");

    return dt;
}
```
Now that we have a parser for converting a string into a DataTable, all we need now is a function that will read the content from a CSV file and pass it to our ParseCSV function:

```csharp
public DataTable ParseCSVFile(string path)
 {

     string inputString = "";

     // check that the file exists before opening it
     if (File.Exists(path))
     {

         StreamReader sr = new StreamReader(path);
         inputString = sr.ReadToEnd();
         sr.Close();

     }

     return ParseCSV(inputString);
 }
 ```
And now you can quickly fill a DataGrid with data coming off the CSV file:

```csharp
protected System.Web.UI.WebControls.DataGrid DataGrid1;

private void Page_Load(object sender, System.EventArgs e) {
		
		// call the parser
		DataTable dt=ParseCSVFile(Server.MapPath("./demo.csv"));

		// bind the resulting DataTable to a DataGrid Web Control
		DataGrid1.DataSource=dt;
		DataGrid1.DataBind();
}
```