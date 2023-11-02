const express = require("express");
const { getAuth, getLoginToken, logout } = require("../controller/authController");
const router = express.Router();

module.exports = router.get("/auth", getAuth);
module.exports = router.get("/login", getLoginToken);
module.exports = router.get("/logout", logout);
