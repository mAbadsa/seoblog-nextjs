const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  signout,
  requireSignin,
  forgetPassword,
  resetPassword,
  preSignup,
} = require("../controllers/auth");

// Validators
const { runValidation } = require("../validators/index");
const {
  userSignupValidator,
  userSigninValidator,
  forgetPasswordValidation,
  resetPasswordValidator,
} = require("../validators/auth");

router.route("/pre-signup").post(userSignupValidator, runValidation, preSignup);

router.route("/signup").post(userSignupValidator, runValidation, signup);

router.route("/signin").post(userSigninValidator, runValidation, signin);

router.route("/signout").get(signout);

router.route("/secret").get(requireSignin, (req, res) => {
  res.json({ user: req.user });
});

router
  .route("/reset-password")
  .put(resetPasswordValidator, runValidation, resetPassword);

router
  .route("/forget-password")
  .put(forgetPasswordValidation, runValidation, forgetPassword);

module.exports = router;
