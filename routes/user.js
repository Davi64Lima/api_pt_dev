const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.create);
router.get("/", userController.findAll);
router.post("/login", userController.login);
router.get("/validation", userController.validation);

module.exports = router;
