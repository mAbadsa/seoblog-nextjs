const { check } = require("express-validator");

const userSignupvalidator = [
  check("name").not().isEmpty().trim().withMessage("Name is required."),
  check("email").isEmail().trim().withMessage("Must be a vaild email address."),
  check("email")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long."),
];

module.exports = {
  userSignupvalidator,
};
