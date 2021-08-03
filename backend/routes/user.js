const express = require("express");
const router = express.Router();

const { requireSignin, authMiddleware } = require("../controllers/auth");

const {
  read,
  publicProfile,
  updateUser,
  getPhoto,
} = require("../controllers/user");

router.route("/user/profile").get(requireSignin, authMiddleware, read);

router.route("/user/p/:username").get(publicProfile);

router.route("/user/update").put(requireSignin, authMiddleware, updateUser);

router.route("/user/photo/:username").get(getPhoto);

module.exports = router;
