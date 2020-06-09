const express = require("express");
const Category = require("../models/Category");
const slugify = require("slugify");
const { errorHandler } = require("../helpers/dbHandleError");

const createCategory = (req, res) => {
  const { name } = req.body;
  let slug = slugify(name).toLowerCase();

  let category = new Category({ name, slug });

  category.save((err, category) => {
      console.log(err);
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.status(201).json({
      message: "Create successed",
      data: category,
    });
  });
};

const listOfCategories = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    res.status(200).json({
      message: "get categories successed",
      data: categories,
    });
  });
};

module.exports = {
  createCategory,
  listOfCategories,
};
