const express = require("express");
const router = express.Router();
const { login, signup, getUser } = require("../controllers/user");

router.get("/:id", getUser);
router.post("/login", login);
router.post("/signup", signup);

module.exports = router;
