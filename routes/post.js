const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
try {
  fs.readdirSync("uploads");
} catch (e) {
  console.log("uploads 폴더를 생성합니다. ");
  fs.mkdirSync("uploads");
}
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      file.originalname = Buffer.from(file.originalname, "latin1").toString(
        "utf8"
      );
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
const upload2 = multer();
router.post("/image", upload.array("images"), (req, res, next) => {
  try {
    const imageArr = req.files.map((file) => ({
      url: `/img/${file.filename}`,
    }));
    return res.status(200).json(imageArr);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});
module.exports = router;
