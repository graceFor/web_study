var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");
var template = require("./lib/template.js");
var path = require("path");
var sanitizeHtml = require("sanitize-html");
var mysql = require("mysql2");

// mysql 서버에 접속하기 위한 setting
var db = mysql.createConnection({
  // host = 데이터베이스 서버가 어떤 컴퓨터에 있는지
  // localhost = node.js와 mysql 서버가 같은 컴퓨터에 있음
  host: "localhost",
  user: "root",
  password: "gustns50",
  database: "opentutorials",
});

//실제 접속
db.connect();

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  console.log(queryData);
  var pathname = url.parse(_url, true).pathname;
  console.log(pathname);
  if (pathname === "/") {
    if (queryData.id === undefined) {
      db.query(`SELECT * from topic`, function (error, topics) {
        var title = "Welcome";
        var description = "Hello, Node.js";
        var list = template.list(topics);
        var html = template.HTML(
          title,
          list,
          `<h2>${title}</h2>${description}`,
          `<a href="/create">create</a>`
        ); // Home에서는 update 존재 안함
        response.writeHead(200);
        response.end(html);
      });
    } else {
      // query string 값 존재 = id 값 존재
      db.query(`SELECT * from topic`, function (error, topics) {
        if (error) {
          throw error;
        }
        db.query(`select * from topic where id =?`, [queryData.id], function (error2, topic) {
          if (error2) {
            throw error2;
          }
          ``;
          // topic에 어떤 값이 들어오는지 확인하기
          console.log(topic);
          var title = topic[0].title;
          var description = topic[0].description;
          var list = template.list(topics);
          var html = template.HTML(
            title,
            list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a> 
            <a href="/update?id=${queryData.id}">update</a>
            <form action="delete_process" method="post">
              <input type="hidden" name="id" value="${queryData.id}">
              <input type="submit" value="delete">
            </form>`
          );
          response.writeHead(200);
          response.end(html);
        });
      });
    }
  } else if (pathname === "/create") {
    // create 페이지에서 UI 만들기
    fs.readdir("./data", function (error, filelist) {
      var title = "WEB - create";
      var list = template.list(filelist);
      var html = template.HTML(
        title,
        list,
        `
        <form action="create_process" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
            <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
      `,
        ""
      );
      response.writeHead(200);
      response.end(html);
    });
  } else if (pathname === "/create_process") {
    var body = "";
    // 사용자가 요청한 정보 안에 POST 정보가 있음
    request.on("data", function (data) {
      // 웹브라우저가 POST 방식으로 데이터를 전송할 때, 데이터가 많으면 그 데이터를 한번에 처리할 수 없어서 node.js에서는 POST 방식으로 전송되는 데이터가 많을 경우를 대비한 방법
      // 정보가 조각조각 들어옴
      body = body + data;
      // body 데이터에 callback이 살행될 때마다 data를 추가함
    });
    request.on("end", function (data) {
      // 더이상 들어올 정보가 없으면 end 다음에 들어올 콜백함수 호출
      // 즉, end에 해당되는 callback이 실행됐을 때, 정보수신 끝났다고 생각하면 됨
      var post = qs.parse(body);
      console.log(post);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, "utf8", function (err) {
        response.writeHead(302, { Location: `/?id=${title}` });
        response.end();
      });
    });
  } else if (pathname === "/update") {
    fs.readdir("./data", function (error, filelist) {
      var filteredId = path.parse(queryData.id).base;
      fs.readFile(`data/${filteredId}`, "utf8", function (err, description) {
        var title = queryData.id;
        var list = template.list(filelist);
        var html = template.HTML(
          title,
          list,
          `
        <form action="/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
          <p><input type="text" name="title" placeholder="title" value="${title}"></p>
          <p>
            <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `,
          `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
        );
        response.writeHead(200);
        response.end(html);
      });
    });
  } else if (pathname === "/update_process") {
    var body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      var post = qs.parse(body);
      // id = 기존의 파일 이름
      var id = post.id;
      // title = 바뀐 파일 이름
      var title = post.title;
      // description = 바뀐 파일 내용
      var description = post.description;
      fs.rename(`data/${id}`, `data/${title}`, function (error) {
        fs.writeFile(`data/${title}`, description, "utf8", function (err) {
          response.writeHead(302, { Location: `/?id=${title}` });
          response.end();
        });
      });
    });
  } else if (pathname === "/delete_process") {
    var body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      var post = qs.parse(body);
      // id = 삭제할 파일 이름
      var id = post.id;
      var filteredId = path.parse(id).base;
      fs.unlink(`data/${filteredId}`, function (error) {
        response.writeHead(302, { Location: `/` });
        response.end();
      });
    });
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(3000);
