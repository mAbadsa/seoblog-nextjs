const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  signout,
  requireSignin,
} = require("../controllers/auth");

// Validators
const { runValidation } = require("../validators/index");
const {
  userSignupValidator,
  userSigninValidator,
} = require("../validators/auth");

router.route("/signup").post(userSignupValidator, runValidation, signup);

router.route("/signin").post(userSigninValidator, runValidation, signin);

router.route("/signout").get(signout);

router.route("/secret").get(requireSignin, (req, res) => {
  res.json({ msg: "Secret Route" });
});

module.exports = router;
