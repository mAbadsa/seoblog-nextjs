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
  listRelatedBlogs,
  blogsSearch,
} = require("../controllers/blog");

const { runValidation } = require("../validators/index");
const { blogCreateValidator } = require("../validators/blog");

const {
  requireSignin,
  authMiddleware,
  adminMiddleware,
} = require("../controllers/auth");
const { create } = require("lodash");

router.route("/blogs").get(getBlogs).post(
  // blogCreateValidator,
  // runValidation,
  requireSignin,
  adminMiddleware,
  createBlog
);

router.route("/blogs-categories-tags").post(listAllBlogsCategoriesTags);

router
  .route("/blogs/:slug")
  .get(getBlog)
  .delete(requireSignin, adminMiddleware, deleteBlog)
  .put(requireSignin, adminMiddleware, updateBlog);

router.route("/blogs/photo/:slug").get(getPhoto);

router.route("/blogs/relatedListBlogs").post(listRelatedBlogs);

router.route("/blog/search").get(blogsSearch);

// Auth User CRUD Blog Route
router.route("/user/blogs").post(requireSignin, authMiddleware, createBlog);

router
  .route("/user/blogs/:slug")
  .delete(requireSignin, authMiddleware, deleteBlog)
  .put(requireSignin, authMiddleware, updateBlog);

module.exports = router;
