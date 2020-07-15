const express = require("express");
const router = express.Router();

const { formContact, formAuthorContact } = require("../controllers/formContact");

// Validators
const { runValidation } = require("../validators/index");
const { contactFormValidation } = require("../validators/form");

router
  .route("/contact")
  .post(contactFormValidation, runValidation, formContact);

router
  .route("/contact-author-form")
  .post(contactFormValidation, runValidation, formAuthorContact);

module.exports = router;
