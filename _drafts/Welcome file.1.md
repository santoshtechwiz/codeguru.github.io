
Supoose you have the follwing **XML**  **file** . If I want to retrieve game1 moves , how would I do it **using** the the simplest way in **javascript** ?

```xml
<?xml version="1.0" encoding="utf-8" ?>
<playMoves>
 <game id="game1" >
     <move>
         <pieceType>black</pieceType>
         <pieceName>pawn</pieceName>
         <moveFrom>82</moveFrom>
         <moveTo>84</moveTo>
     </move>
     <move>
         <pieceType>white</pieceType>
         <pieceName>pawn</pieceName>
         <moveFrom>87</moveFrom>
         <moveTo>85</moveTo>
     </move>
 </game>
 <game id = "game2" >
     <move>
         <pieceType>white</pieceType>
         <pieceName>pawn</pieceName>
         <moveFrom>87</moveFrom>
         <moveTo>85</moveTo>
     </move>
     <move>
         <pieceType>black</pieceType>
         <pieceName>pawn</pieceName>
         <moveFrom>82</moveFrom>
         <moveTo>84</moveTo>
     </move>
 </game>
</playMoves>

<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ReadXMLfile.aspx.cs" Inherits="ReadXMLfile" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
   <title>Untitled Page</title>

   <script type="text/javascript">

// predeclare to prevent strict js error.
var xmlDoc;

// For IE based browsers:
if (window.ActiveXObject) {
 xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
}

// For Mozilla based (standards compliant) browsers:
else if (document.implementation && document.implementation.createDocument) {
 xmlDoc = document.implementation.createDocument("","doc",null);
}

// Turn off asynchronus download.
// In other words, load the entire file before trying to do anything with it.
xmlDoc.async=false;

xmlDoc.load("Java.xml");

// Run onload of body.
function ProcessXML()
{
   var game = xmlDoc.getElementsByTagName("game")[0]; // First game.
   var moves = game.getElementsByTagName("move"); // All moves in game.

   var results = '';

   for (var i=0; moves.length > i; i++)
   {
         var pieceType = moves[i].getElementsByTagName("pieceType");
         var pieceName = moves[i].getElementsByTagName("pieceName");
         results += i+1 + '. ' + pieceType[0].firstChild.nodeValue +
               ' moved a ' + pieceName[0].firstChild.nodeValue + "\n\r";
   }

   document.getElementById("displayresults").firstChild.nodeValue = results;
}

   </script>

</head>
<body onload="ProcessXML();">
   <form id="form1" runat="server">
   <div id="displayresults">
   </div>
   </form>
</body>
</html>
<!--stackedit_data:
eyJoaXN0b3J5IjpbNjI4NDkyNzQxLC0zMzI0NTUzNjNdfQ==
-->