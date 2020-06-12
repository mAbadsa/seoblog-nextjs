const express = require("express");
const Blog = require("../models/Blog");
const User = require("../models/User");

const getBlogs = async (req, res) => {
  const blogs = await Blog.find({})
    .populate({ path: "postedBy", select: "name email", options: { limit: 2 } })
    .exec();
  const count = await Blog.find({}).countDocuments();

  res.json({
    success: true,
    count,
    data: blogs,
    erorr: [],
  });
};

const createBlog = async (req, res) => {
  const { title, body } = req.body;
  const user = await User.findById({ _id: req.user._id });

  if (!user) {
    res.status(400).json({
      success: false,
      data: [],
      error,
    });
  }

  const blog = new Blog({ title, body, postedBy: user._id });
  try {
    await blog.save();
    res.status(200).json({
      success: true,
      data: blog,
      error: [],
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: [],
      error,
    });
  }
};

module.exports = {
  getBlogs,
  createBlog,
};
