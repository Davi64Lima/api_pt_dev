const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");
const upload = require("../middlewares/multer");
const AdminAuth = require("../middlewares/AdminAuth");

router.get("/", newsController.findAll);
router.get("/:quantity", newsController.findQuantity);
router.post("/", upload.single("file"), AdminAuth, newsController.create);
router.delete("/:id", newsController.deleteById);

router.get("/:id", newsController.findById);
router.get("/cat/:categoria", newsController.findByCategorie);

// router.get("/:id", newsController.findPerId);
//router.post("/login", userController.login);
//router.delete("/:id", userController.remove);
// router.get("/profile", checkToken, newsController.profile);

module.exports = router;
