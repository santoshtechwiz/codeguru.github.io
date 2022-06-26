In this post, I will show you how to integrate the google org chart in your  asp.net or any web application that supports ser application.

-   First, create a new empty website in the visual studio
-   Add jquery and google visualization API reference to the default page

[![](http://4.bp.blogspot.com/-5liL_1jkoz0/Um_bUANr-BI/AAAAAAAACjY/SC6WTkQl5aY/s640/orgchart.png "Google Chart")](https://www.blogger.com/blog/post/edit/6673695286148904603/1003635980750663012#)

> Let’s first create dummy data. Create the following table schema and insert some dummy data into this.

**Table Schema**

```sql

CREATE TABLE [dbo].[EMPLOYEES] (
  [EmpID] CHAR (4)     NOT NULL,
  [Ename] VARCHAR (10) NULL,
  [MGR]   CHAR (4)     NULL,
  PRIMARY KEY CLUSTERED ([EmpID] ASC),
  UNIQUE NONCLUSTERED ([EmpID] ASC)
);

```

**Insert Data**

```sql
INSERT INTO [dbo].[EMPLOYEES] ([EmpID], [Ename], [MGR]) VALUES (N'7369', N'Smith', N'7902')
INSERT INTO [dbo].[EMPLOYEES] ([EmpID], [Ename], [MGR]) VALUES (N'7499', N'Allen', N'7698')
INSERT INTO [dbo].[EMPLOYEES] ([EmpID], [Ename], [MGR]) VALUES (N'7521', N'Ward', N'7698')
INSERT INTO [dbo].[EMPLOYEES] ([EmpID], [Ename], [MGR]) VALUES (N'7566', N'Jones', N'7839')
INSERT INTO [dbo].[EMPLOYEES] ([EmpID], [Ename], [MGR]) VALUES (N'7654', N'Martin', N'7698')
INSERT INTO [dbo].[EMPLOYEES] ([EmpID], [Ename], [MGR]) VALUES (N'7698', N'Blake', N'7839')
INSERT INTO [dbo].[EMPLOYEES] ([EmpID], [Ename], [MGR]) VALUES (N'7782', N'Clark', N'7839')
INSERT INTO [dbo].[EMPLOYEES] ([EmpID], [Ename], [MGR]) VALUES (N'7788', N'Scott', N'7566')
INSERT INTO [dbo].[EMPLOYEES] ([EmpID], [Ename], [MGR]) VALUES (N'7839', N'King', NULL)
INSERT INTO [dbo].[EMPLOYEES] ([EmpID], [Ename], [MGR]) VALUES (N'7844', N'Turner', N'7698')
INSERT INTO [dbo].[EMPLOYEES] ([EmpID], [Ename], [MGR]) VALUES (N'7876', N'Adams', N'7788')
INSERT INTO [dbo].[EMPLOYEES] ([EmpID], [Ename], [MGR]) VALUES (N'7900', N'James', N'7698')
INSERT INTO [dbo].[EMPLOYEES] ([EmpID], [Ename], [MGR]) VALUES (N'7902', N'Ford', N'7566')
INSERT INTO [dbo].[EMPLOYEES] ([EmpID], [Ename], [MGR]) VALUES (N'7934', N'Miller', N'7782')

```

----------

> Create the following stored procedure that returns employee and manager relationship result into JSON string.

**StoredProcedure**

```sql
CREATE PROC GetEmployees
AS ;
    WITH    EmployeeManager
              AS ( SELECT   e1.empid empno ,
                            e1.ename ename ,
                            e2.eName mgr_ename
                   FROM     employees e1
                            LEFT JOIN employees e2 ON e1.mgr = e2.empid
                 )
        SELECT  '['
                + STUFF((SELECT ',{"id":' + CAST(empno AS VARCHAR(MAX))
                                + ',"name":"' + ename + '"' + ',"Manger":"'
                                + CAST(mgr_ename AS VARCHAR(MAX)) + '"' + '}'
                         FROM   EmployeeManager t1
                FOR     XML PATH('') ,
                            TYPE
    ).value('.', 'varchar(max)'), 1, 1, '') + ']
 

```

> Once the database is set up create a default.aspx page and add following code into it.

```html
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="http://www.google.com/jsapi"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script>
   
    
    
    </script>
    <script>
        google.load('visualization', '1', { packages: ['table', 'orgchart'] });
        function draw() {
            $.ajax({
                type: "POST",
                url: "Service.svc/",
                data: "{}",
                dataType: "json",
                contentType: "application/json",
                success: function (x, textStatus) {
                    var data = JSON.parse(x);

                    if ((emp_count = data.length) > 0) {
                        var l_data_table = new google.visualization.DataTable();
                        l_data_table.addColumn('string', 'Name');
                        l_data_table.addColumn('string', 'Manager');
                        l_data_table.addRows(emp_count);

                        for (i = 0; i < emp_count; i++) {
                            l_data_table.setCell(i, 0, data[i].name);
                            l_data_table.setCell(i, 1, data[i].Manger);
                        }

                        var chart = new google.visualization.OrgChart(document.getElementById('org_div'));
                        chart.draw(l_data_table, { allowHtml: true });


                    }
                }
            });
        }

        $(document).ready(function () {
            draw();

        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div id="org_div"></div>
    </form>
</body>
</html> 

```

Add a new ajax enabled WCF service and add following code. In this code snippet, I am calling above stored procedure and returning the result as a string.

```csharp
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;

[ServiceContract(Namespace = "")]
[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
public class Service
{
    [OperationContract]
    [WebInvoke(UriTemplate = "/", ResponseFormat = WebMessageFormat.Json)]
    public string GetEmployee()
    {
        try
        {
            SqlConnection con = new SqlConnection(@"Data Source=(LocalDB)\v11.0;AttachDbFilename=|DataDirectory|\Database.mdf;Integrated Security=True");
            SqlCommand command = new SqlCommand("json", con);
            command.CommandType = CommandType.StoredProcedure;
            con.Open();
            return (string)command.ExecuteScalar();
        }
        catch (SqlException ex)
        {
            return ex.Message.ToString();

        }
    }


}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTgzMTk2Mzk2NV19
-->