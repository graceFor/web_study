var express = require("express");
var router = express.Router();
var multer = require("multer");
var Drama = require("../models/drama");

var multer_settings = multer({
  dest: "./public/images/",
});

/* GET users listing. */

// Create
// form 형식으로 send 버튼 누르면 post 방식으로 보냄
router.get("/create", function (req, res) {
  res.render("create", { title: "한국 드라마 - 글쓰기" });
});
// create에서 보낸 데이터를 받아서 저장
router.post("/create_process", multer_settings.single("image"), function (req, res) {
  Drama.create(
    { title: req.body.title, description: req.body.description, imagePath: req.file.path },
    function (err) {
      return res.json(err);
    }
  );
  res.redirect("/");
});
// Update
router.get("/update/:id", function (req, res) {});
router.post("/update_process", function (req, res) {});
// Delete
router.get("delete_process", function (req, res) {});

router.get("/:id", function (req, res) {});

module.exports = router;
