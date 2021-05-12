var http = require("http"); //require => 요구하다.
var fs = require("fs");
var url = require("url"); // url이라는 모듈을 사용할 것이라고 node.js에게 알려줌
// url => 모듈 url을 말함

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  console.log(queryData); // {id: 'HTML'}
  console.log(queryData.id); // HTML
  if (_url == "/") {
    _url = "/index.html";
  }
  if (_url == "/favicon.ico") {
    return response.writeHead(404);
  }
  response.writeHead(200);
  response.end(queryData.id); // 화면에 HTML이 나옴
});
app.listen(3000);
