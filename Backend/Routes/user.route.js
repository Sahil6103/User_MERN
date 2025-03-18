const express = require("express");
const { registerUser, loginUser } = require("../Controllers/crudController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
