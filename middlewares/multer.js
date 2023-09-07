const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/../../api/public/uploads"));
  },
  filename: function (req, file, cb) {
    // Gere um nome de arquivo único, por exemplo, usando um timestamp
    const timestamp = Date.now();
    const filename = `${timestamp}${path.extname(file.originalname)}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

module.exports = upload;
