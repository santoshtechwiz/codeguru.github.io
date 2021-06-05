This series I started to share with you some tips and tricks that I found during my day to day software development.

Today I am going to share you one very cool tricks that are used in Graphics and visualization.

The problem is you have given one range, for example, 0-10 and you have to convert this range to 0-100. This is a typical math problem.
Use the following formula to scale the one range to another.

```bash
	 scale(v)=(newMax-newMin)/(oldMax-oldMin)*(v-oldMin)+newMin)
```
``` javascript
const rescale=(value)=>{
   const oldScale=[0,10];
   const newScale=[0,100];
   const scale=(newScale[1]-newScale[0])/(oldScale[1]-oldScale[0])*(value-oldScale[0])+newScale[0];
   return scale;

}
console.log(rescale(2));
```

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTExNTUxOTE4MV19
-->