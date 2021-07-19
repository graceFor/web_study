var db = require("./db.js");
var template = require("./template.js");
var url = require("url");
var qs = require("querystring");
var sanitizeHtml = require("sanitize-html");

exports.home = function (request, response) {
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
};

exports.detail = function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  // query string 값 존재 = id 값 존재
  db.query(`SELECT * from topic`, function (error, topics) {
    if (error) {
      throw error;
    }
    db.query(
      `select * from topic join author on topic.author_id=author.id where topic.id =?`,
      [queryData.id],
      function (error2, topic) {
        if (error2) {
          throw error2;
        }
        // topic에 어떤 값이 들어오는지 확인하기
        console.log(topic);
        var title = topic[0].title;
        var description = topic[0].description;
        var list = template.list(topics);
        var html = template.HTML(
          title,
          list,
          `
          <h2>${sanitizeHtml(title)}</h2>
          ${sanitizeHtml(description)}
          <p>by ${sanitizeHtml(topic[0].name)}</p>
          `,
          `<a href="/create">create</a> 
        <a href="/update?id=${queryData.id}">update</a>
        <form action="delete_process" method="post">
          <input type="hidden" name="id" value="${queryData.id}">
          <input type="submit" value="delete">
        </form>`
        );
        response.writeHead(200);
        response.end(html);
      }
    );
  });
};

exports.create = function (request, response) {
  db.query(`select * from topic`, function (error, topics) {
    db.query(`select * from author`, function (error2, authors) {
      var title = "Create";
      var list = template.list(topics);
      var html = template.HTML(
        title,
        list,
        `<form action="create_process" method="post">
              <p><input type="text" name="title" placeholder="title"></p>
              <p>
                <textarea name="description" placeholder="description"></textarea>
              </p>
              <p>
              ${template.authorSelect(authors)}
              </p>
              <p>
                <input type="submit">
              </p>
            </form>`,
        ` <a href="/create">create</a> `
      );
      response.writeHead(200);
      response.end(html);
    });
  });
};

exports.create_process = function (request, response) {
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
    db.query(
      `insert into topic (title, description, created, author_id) values (?, ?, Now(), ?);`,
      [post.title, post.description, post.author],
      function (error, result) {
        if (error) {
          // 에러 생기면 에러 처리
          throw error;
        }
        // 삽입한 행의 id 값을 알아내야 함
        response.writeHead(302, { Location: `/?id=${result.insertId}` });
        response.end();
      }
    );
  });
};

exports.update = function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  db.query(`SELECT * from topic`, function (error, topics) {
    if (error) {
      throw error;
    }
    db.query(`select * from topic where id =?`, [queryData.id], function (error2, topic) {
      if (error2) {
        throw error2;
      }
      db.query(`select * from author`, function (error2, authors) {
        // topic에 어떤 값이 들어오는지 확인하기
        console.log(topic);
        var list = template.list(topics);
        var html = template.HTML(
          topic[0].title,
          list,
          `
          <form action="/update_process" method="post">
            <input type="hidden" name="id" value="${topic[0].id}">
            <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
            <p>
              <textarea name="description" placeholder="description">${
                topic[0].description
              }</textarea>
            </p>
            <p>${template.authorSelect(authors, topic[0].author_id)}</p>
            <p>
              <input type="submit">
            </p>
          </form>
          `,
          `<a href="/create">create</a> <a href="/update?id=${topic[0].id}">update</a>`
        );
        response.writeHead(200);
        response.end(html);
      });
    });
  });
};

exports.update_process = function (request, response) {
  var body = "";
  request.on("data", function (data) {
    body = body + data;
  });
  request.on("end", function () {
    var post = qs.parse(body);

    // post.title = 바뀐 데이터 이름, post.description = 바뀐 데이터 내용, post.id = 데이터 id

    db.query(
      `UPDATE topic SET title =?, description=?,  author_id=? WHERE id=?`,
      [post.title, post.description, post.author, post.id],
      function (error, result) {
        if (error) {
          throw error;
        }
        response.writeHead(302, { Location: `/?id=${post.id}` });
        response.end();
      }
    );
  });
};

exports.delete_process = function (request, response) {
  var body = "";
  request.on("data", function (data) {
    body = body + data;
  });
  request.on("end", function () {
    var post = qs.parse(body);
    // id = 삭제할 데이터의 id

    db.query(`delete from topic where id = ?`, [post.id], function (error, result) {
      if (error) {
        throw error;
      }
      response.writeHead(302, { Location: `/` });
      response.end();
    });
  });
};
