var express = require("express");
var router = express.Router();
var multer = require("multer");
var Drama = require("../models/drama");
var fs = require("fs");
var methodOverride = require("method-override");

router.use(methodOverride("_method"));
const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
  },
});

var upload = multer({ storage: storage });

/* GET users listing. */

// Create
// form 형식으로 send 버튼 누르면 post 방식으로 보냄
router.get("/create", function (req, res) {
  res.render("create", { title: "한국 드라마 - 글쓰기" });
});
// create에서 보낸 데이터를 받아서 저장
router.post("/create_process", upload.single("image"), function (req, res) {
  console.log(req.file);
  Drama.create(
    {
      title: req.body.title,
      description: req.body.description,
      imagePath: `/images/${req.file.filename}`,
    },
    function (err) {
      return res.json(err);
    }
  );
  res.redirect("/");
});
//Update
router.get("/update/:id", function (req, res) {
  Drama.findOne({ _id: req.params.id }, function (err, drama) {
    if (err) return res.json(err);
    res.render("update", { drama: drama });
  });
});

router.put("/:id", function (req, res) {
  Drama.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, drama) {
    if (err) return res.json(err);
    res.redirect("/drama/" + req.params.id);
  });
});

// Delete
router.post("/delete_process", function (req, res) {
  console.log(req.body._id);

  fs.unlink(`./public/${req.body.imagePath}`, function (error) {});
  Drama.deleteOne({ _id: req.body._id }, function (err, drama) {
    if (err) return res.json(err);
    res.redirect("/");
  });
});

router.get("/:id", function (req, res) {
  Drama.findOne({ _id: req.params.id }, function (err, drama) {
    console.log("1" + drama);
    res.render("drama", { drama: drama });
  });
});

module.exports = router;
