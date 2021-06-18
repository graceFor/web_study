const createError = require("http-errors");
require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

const indexRouter = require("./routes/index");
const dramaRouter = require("./routes/drama");

const app = express();
// CONNECT TO MONGODB SERVER

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("success connected to mongodb"))
  .catch((e) => console.error(e));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

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
  res.render("error", {
    message: err.message,
    error: err,
  });
});

module.exports = app;
