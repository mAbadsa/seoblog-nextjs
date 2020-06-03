const express = require("express");
const router = express.Router();

const { signup } = require("../controllers/auth");

// Validators
const { runValidation } = require("../validators/index");
const { userSignupvalidator } = require("../validators/auth");

router.route("/signup").post(userSignupvalidator, runValidation, signup);

module.exports = router;
