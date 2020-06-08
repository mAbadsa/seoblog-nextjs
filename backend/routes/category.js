const express = require("express");
const { createCategory } = require("../controllers/category");
const { requireSignin, adminMiddleware } = require("../controllers/auth");

const { runValidation } = require("../validators/index");
const { categoryCreateValidator } = require("../validators/category");

const router = express.Router();

router
  .route("/category")
  .get()
  .post(
    categoryCreateValidator,
    runValidation,
    requireSignin,
    adminMiddleware,
    createCategory
  );

module.exports = router;
