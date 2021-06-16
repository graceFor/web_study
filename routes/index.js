var express = require("express");
var Drama = require("../models/drama");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  Drama.find({}, function (err, drama) {
    res.render("index", { title: "한국드리마", drama: drama });
  });
});

module.exports = router;
