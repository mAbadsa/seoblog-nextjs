const express = require("express");
const router = express.Router();

const { getTags, createTag, getTag, delTag } = require("../controllers/tag");

const { tagCreateValidator } = require("../validators/tag");
const { runValidation } = require("../validators/index");

const { requireSignin, adminMiddleware } = require("../controllers/auth");

router
  .route("/tag")
  .post(
    tagCreateValidator,
    runValidation,
    requireSignin,
    adminMiddleware,
    createTag
  );

router.route("/tags").get(getTags);

router
  .route("/tag/:slug")
  .get(getTag)
  .delete(requireSignin, adminMiddleware, delTag);

module.exports = router;
