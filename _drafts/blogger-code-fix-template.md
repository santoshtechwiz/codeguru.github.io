We often want the first option in a drop-down list to not default to the first item.in the list. Instead we would prefer the option of adding a --Select Item-- at the top of the asp:DropDownList. After the DataBind, execute an `Item.Insert`.
```csharp
ddlAuthor.DataTextField = "FullName";
ddlAuthor.DataValueField = "AuthorID";
ddlAuthor.DataSource = authorDB.GetAuthors();
ddlAuthor.DataBind();
ddlAuthor.Items.Insert(0, "-- Select Author --");
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE3ODkwMjcwMDldfQ==
-->