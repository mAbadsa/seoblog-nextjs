const express = require("express");
const router = express.Router();

const { formContact } = require("../controllers/formContact");

// Validators
const { runValidation } = require("../validators/index");
const { contactFormValidation } = require("../validators/form");

router
  .route("/contact")
  .get(contactFormValidation, runValidation, formContact);

module.exports = router;
