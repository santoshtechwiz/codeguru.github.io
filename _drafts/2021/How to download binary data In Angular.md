## How to download binary data In Angular

You can use responseType option as shown below

  

``` javascript

import { HttpClient, HttpHeaders } from  '@angular/common/http';

  

downloadFile(file){

return  this.httpClient.post('http://127.0.0.1/downloadFile',file,{

responseType : 'blob',

headers : new HttpHeaders().append('content-type','application/json')

});

}

```

<!--stackedit_data:
eyJwcm9wZXJ0aWVzIjoidGl0bGU6IEhvdyB0byBkb3dubG9hZC
BiaW5hcnkgZGF0YSBJbiBBbmd1bGFyXG4iLCJoaXN0b3J5Ijpb
MjcyNTQxMzk0XX0=
-->