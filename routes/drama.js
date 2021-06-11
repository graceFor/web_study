var express = require("express");
var router = express.Router();
var Drama = require("../models/drama");

/* GET users listing. */

// 드라마 전체적으로 띄어주기
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// Create
// form 형식으로 send 버튼 누르면 post 방식으로 보냄
router.get("/create", function (req, res) {});
// create에서 보낸 데이터를 받아서 저장
router.post("/create_process", function (req, res) {});
// Update
router.get("/update", function (req, res) {});
router.post("/update_process", function (req, res) {});
// Delete
router.ger("delete_process", function (req, res) {});

module.exports = router;
