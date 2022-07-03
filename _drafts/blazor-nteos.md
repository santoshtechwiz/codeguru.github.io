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


### Note 2 RenderFramgement2


- Create a templated component
- Render cotent in a givne template  formatting,inserting  andn  of type T
- Add a typepramete directive to indicate the generic type of the parameter of the compoent
@typepram

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE3ODMwODU5OV19
-->