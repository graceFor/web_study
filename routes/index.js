var express = require("express");
var router = express.Router();
var template = require("../lib/template");

//route, routing
// '/' 경로가 호출됐을 때, 즉 그 경로로 접속자가 들어왔을 때, 호출될 함수
// app.get("/", (req, res) => res.send("/"));
router.get("/", function (request, response) {
  //fs.readdir("./data", function (error, filelist) {
  var title = "Welcome";
  var description = "Hello, Node.js";
  var list = template.list(request.list);
  var html = template.HTML(
    title,
    list,
    `<h2>${title}</h2>${description}
      <img src="/images/hello.jpg"style="width:300px; display:block; margin-top:10px;"></img>`,
    `<a href="/create">create</a>`
  );
  response.send(html);
  //});
});

module.exports = router;
