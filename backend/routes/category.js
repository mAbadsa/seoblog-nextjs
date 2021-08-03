const express = require("express");
const {
  createCategory,
  listOfCategories,
  getCategory,
  delCategory,
} = require("../controllers/category");
const { requireSignin, adminMiddleware } = require("../controllers/auth");

const { runValidation } = require("../validators/index");
const { categoryCreateValidator } = require("../validators/category");

const router = express.Router();

router
  .route("/category")
  .post(
    categoryCreateValidator,
    runValidation,
    requireSignin,
    adminMiddleware,
    createCategory
  );

router.route("/categories").get(listOfCategories);

router
  .route("/category/:slug")
  .get(getCategory)
  .delete(requireSignin, adminMiddleware, delCategory);

module.exports = router;
