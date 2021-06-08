var createError = require("http-errors");
require("dotenv").config();
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const { PORT, MONGO_URI } = process.env;

var indexRouter = require("./routes/index");
var dramaRouter = require("./routes/drama");

var app = express();
// CONNECT TO MONGODB SERVER
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected to mongodb"))
  .catch((e) => console.error(e));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 정적인 파일(image)
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/drama", dramaRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//  success connection
app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});

module.exports = app;
