![Imgur](https://i.imgur.com/2C8tCgo.jpg)
## How to get raw response while making HTTP request in Angular

You can pass `observe:'response'` in the HTTP get option

``` javascript
getConfigResponse(): Observable<HttpResponse<Config>> {
return this.http.get<Config>(
this.configUrl, { observe: 'response' });
}
```





  






<!--stackedit_data:
eyJwcm9wZXJ0aWVzIjoidGl0bGU6IEhvdyB0byBnZXQgcmF3IH
Jlc3BvbnNlIHdoaWxlIG1ha2luZyBIVFRQIHJlcXVlc3QgaW4g
QW5ndWxhclxuIiwiaGlzdG9yeSI6Wzk1MDYxMjk0NF19
-->