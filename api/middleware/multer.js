const multer = require("multer");
const path = require("path");

module.exports = multer({
  dest: "uploads/",
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".JPG") {
      cb(null, false);
      return;
    }
    cb(null, true);
  },
});