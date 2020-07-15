const express = require("express");
const router = express.Router();

const { contact, authorContact } = require("../controllers/contact");

// Validators
const { runValidation } = require("../validators/index");
const { contactFormValidation } = require("../validators/form");

router.route("/contact").post(contactFormValidation, runValidation, contact);

router
  .route("/contact-blog-author")
  .post(contactFormValidation, runValidation, authorContact);

module.exports = router;
