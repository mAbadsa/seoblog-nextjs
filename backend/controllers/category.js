const express = require("express");
const Category = require("../models/Category");
const slugify = require("slugify");

const createCategory = (req, res) => {
  const { name } = req.body;
  let slug = slugify(name).toLowerCase();

  let category = new Category({ name, slug });

  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.status(201).json({
      message: "Create successed",
      data: category,
    });
  });
};

module.exports = {
  createCategory,
};
