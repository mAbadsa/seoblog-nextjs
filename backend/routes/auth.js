const express = require("express");
const router = express.Router();

const { signup, signin } = require("../controllers/auth");

// Validators
const { runValidation } = require("../validators/index");
const {
  userSignupValidator,
  userSigninValidator,
} = require("../validators/auth");

router.route("/signup").post(userSignupValidator, runValidation, signup);

router.route("/signin").post(userSigninValidator, runValidation, signin);

module.exports = router;
