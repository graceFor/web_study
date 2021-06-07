// 모듈인 express를 가져옴
var express = require("express");
var app = express();
var fs = require("fs");
var path = require("path");
var qs = require("querystring");
var bodyParser = require("body-parser");
var sanitizeHtml = require("sanitize-html");
var compression = require("compression");
var template = require("./lib/template.js");
var topicRouter = require("./routes/topic");
var indexRouter = require("./routes/index");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

//글 목록 저장하는 미들웨어
app.get("*", function (request, response, next) {
  fs.readdir("./data", function (error, filelist) {
    request.list = filelist;
    next();
  });
});

app.use("/", indexRouter);
app.use("/topic", topicRouter);

app.use(function (req, res, next) {
  res.status(404).send("Sorry cant find that!");
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// app.listen(3000, ()=>console.log("Example app listening on port 3000!")
app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
