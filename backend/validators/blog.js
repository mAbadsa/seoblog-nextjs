const { check } = require("express-validator");

exports.blogCreateValidator = [
  check("title")
    .not()
    .isEmpty()
    .trim()
    .length({ min: 3, max: 160 })
    .withMessage("Title is required"),
  check("body")
    .not()
    .isEmpty()
    .length({ min: 200 })
    .withMessage("Body is required"),
];
