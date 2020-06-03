const express = require("express");
const router = express.Router();

const { getBlogs } = require("../controllers/blog");

router.route("/").get(getBlogs);

module.exports = router;
