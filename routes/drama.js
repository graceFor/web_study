var express = require("express");
var router = express.Router();

/* GET users listing. */

// 드라마 전체적으로 띄어주기
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;

// Create

// Update

// Delete
