const { check } = require("express-validator");

const userSignupValidator = [
  check("name").not().isEmpty().trim().withMessage("Name is required."),
  check("email").isEmail().trim().withMessage("Must be a vaild email address."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long."),
];

const userSigninValidator = [
  check("email").isEmail().trim().withMessage("Must be a vaild email address."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long."),
];

const forgetPasswordValidation = [
  check("email")
    .not()
    .isEmpty()
    .trim()
    .isEmail()
    .withMessage("Must be a vaild email address."),
];

const resetPasswordValidator = [
  check("newPassword")
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long."),
];

module.exports = {
  userSignupValidator,
  userSigninValidator,
  forgetPasswordValidation,
  resetPasswordValidator,
};
