
The following is a very short example how you can create your own PagerTemplate
for the GridViewControl and adding server side code blocks to the template.


```html
<asp:GridView AllowPaging=True Id="GridView1" ...>
 <PagerTemplate>
    Selected Index <%= GridView1.PageIndex * GridView1.PageSize %>
 Nunmber of pages <%=GridView1.PageCount %>
 </PagerTemplate>
</asp:GridView>
```


By using server side code block within the template, you can create your own pager. If you want to add a First/Last or Next/Prev button, you simply add a Button control  and set its CommandName to “First”, “Last”, “Next” or “Prev”. You don’t need to add any event that should handle the paging, the GridView will get the CommandName for  the buttons you have pressed and do the action for you. To add a numeric paging, you add Button controls where the CommandName shouled be set to “Page” and the  CommandArgument to the index of the page to navigate to.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIwNjY2NTU0NzUsLTkzODUxNjIzOCwtMz
MyNDU1MzYzXX0=
-->