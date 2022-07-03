## Note 1

### Attribute Splatting

- Capture all the other parameters that we dont know about 
```csharp
[Parameter(CaptureUnmatchedValues=true)]
public Dictionary<string,object> OtherAttributes {get;set;}
```

- Output parameter with the @atrributes attribute
```
	
<div @attributes="OtherAttributes extra="5"/>
```
- OtherAttributes in not a Required parameter name


<!--stackedit_data:
eyJoaXN0b3J5IjpbMTMzMTUyMDY1Ml19
-->