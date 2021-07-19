const express = require("express");
const Drama = require("../models/drama");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  Drama.find({}, function (err, drama) {
    res.render("index", { title: "한국드리마", drama: drama });
  });
});

module.exports = router;
