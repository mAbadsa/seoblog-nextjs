const express = require("express");
const router = express.Router();

const {
  getBlogs,
  getBlog,
  deleteBlog,
  updateBlog,
} = require("../controllers/blog");

const {
  requireSignin,
  authMiddleware,
  adminMiddleware,
} = require("../controllers/auth");

router.route("/").get(getBlogs);

router
  .route("/:blogId")
  .get(getBlog)
  .delete(requireSignin, adminMiddleware, deleteBlog)
  .put(requireSignin, adminMiddleware, updateBlog);

module.exports = router;
