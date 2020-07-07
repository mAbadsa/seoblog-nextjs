const express = require("express");
const router = express.Router();

const {
  requireSignin,
  authMiddleware,
  adminMiddleware,
} = require("../controllers/auth");

const { read, publicProfile } = require("../controllers/user");

router.route("/profile").get(requireSignin, adminMiddleware, read);

router.route("/user/:username").get(publicProfile);

module.exports = router;
