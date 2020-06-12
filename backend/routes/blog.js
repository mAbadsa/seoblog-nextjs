const express = require("express");
const router = express.Router();

const {
  getBlogs,
  createBlog,
  //   getBlog,
  //   deleteBlog,
  //   updateBlog,
} = require("../controllers/blog");

const { runValidation } = require("../validators/index");
const { blogCreateValidator } = require("../validators/blog");

const {
  requireSignin,
  authMiddleware,
  adminMiddleware,
} = require("../controllers/auth");

router
  .route("/blogs")
  .get(getBlogs)
  .post(
    blogCreateValidator,
    runValidation,
    requireSignin,
    adminMiddleware,
    createBlog
  );

// router
//   .route("/:blogId")
//   .get(getBlog)
//   .delete(requireSignin, adminMiddleware, deleteBlog)
//   .put(requireSignin, adminMiddleware, updateBlog);

module.exports = router;
