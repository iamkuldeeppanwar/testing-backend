const express = require("express");
const {
  register,
  login,
  userProfile,
} = require("../controller/user.controller");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/protected", auth, userProfile);

module.exports = router;
