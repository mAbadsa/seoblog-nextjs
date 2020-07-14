const { check } = require("express-validator");

exports.contactFormValidation = [
  check("name").not().isEmpty().withMessage("Name is required!"),
  check("email").isEmail().withMessage("Email must be valid"),
  check("message")
    .not()
    .isEmpty()
    .isLength({ min: 20 })
    .withMessage("Message must be at least 20 characters long!"),
];
