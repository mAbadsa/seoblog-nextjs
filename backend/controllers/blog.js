const express = require("express");

const getBlogs = async (req, res) => {
  res.json({
    success: true,
    data: [],
    message: "Hello",
  });
};

module.exports = {
  getBlogs,
};
