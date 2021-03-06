const express = require("express");
const router = express.Router();
const multer = require("multer");
const Drama = require("../models/drama");
const fs = require("fs");
const methodOverride = require("method-override");
const path = require("path");

router.use(methodOverride("_method"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
  },
});

const upload = multer({ storage: storage });

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
    }
    // function (err) {
    //   return res.json(err);
    // }
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
