const express = require("express");
const router = express.Router();

const {
  getBlogs,
  createBlog,
  listAllBlogsCategoriesTags,
  getBlog,
  deleteBlog,
  updateBlog,
  getPhoto,
} = require("../controllers/blog");

const { runValidation } = require("../validators/index");
const { blogCreateValidator } = require("../validators/blog");

const {
  requireSignin,
  authMiddleware,
  adminMiddleware,
} = require("../controllers/auth");

router.route("/blogs").get(getBlogs).post(
  // blogCreateValidator,
  // runValidation,
  requireSignin,
  adminMiddleware,
  createBlog
);

router.route("/blogs-categoies-tags").post(listAllBlogsCategoriesTags);

router
  .route("/blogs/:slug")
  .get(getBlog)
  .delete(requireSignin, adminMiddleware, deleteBlog)
  .put(requireSignin, adminMiddleware, updateBlog);

router.route("/blogs/photo/:slug").get(getPhoto);

module.exports = router;
