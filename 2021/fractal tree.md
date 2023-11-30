Recursion is a very popular technique for solving computer science problem. In this tutorial, I am going to show you how to generate a fractal tree
 

## What is a fractal tree?

> In mathematics, a fractal is a self-similar subset of Euclidean space whose fractal dimension strictly exceeds its topological dimension.
```javascript
var canvas=document.getElementById("canvas");  
var ctx=canvas.getContext("2d");  
var width=canvas.width=window.innerWidth;  
var diff=Math.PI/6;  
height=canvas.height=window.innerHeight;  
function line(x1, y1, x2, y2) {  
  ctx.beginPath();  
  ctx.strokeStyle='hsl(' + 360 * Math.random() + ', 50%, 50%)';  
  ctx.moveTo(x1, y1);  
  ctx.lineTo(x2, y2);  
  ctx.stroke();  
}  
window.onload=function(){  
    
  function tree(x,y,len,angle,depth){  
    var x1=(x+len*Math.cos(angle));  
    var y1=(y+len*Math.sin(angle));  
    line(x,y,x1,y1);  
    if(depth>1){  
        
      tree(x1,y1,len*2/3,angle+diff,depth-1);  
           
      tree(x1,y1,len*2/3,angle-diff,depth-1);  
    }  
      
  }  
    
  tree(height/2,height-100,100,-Math.PI/2,16);  
    
    
};
```
[![](https://1.bp.blogspot.com/-655VTFqTfE8/XrQvacmPUlI/AAAAAAAAMfg/ZiADdAKOQWkBvfkayL-yBpueikiv7yq2gCK4BGAsYHg/d/fractal.png)](https://1.bp.blogspot.com/-655VTFqTfE8/XrQvacmPUlI/AAAAAAAAMfg/ZiADdAKOQWkBvfkayL-yBpueikiv7yq2gCK4BGAsYHg/fractal.png)

  
Fractal Tree
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTI2OTA4MjkxOV19
-->