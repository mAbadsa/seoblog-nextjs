const Category = require("../models/Category");
const Blog = require("../models/Blog");
const slugify = require("slugify");
const { errorHandler } = require("../helpers/dbHandleError");

const createCategory = (req, res) => {
  const { name } = req.body;
  let slug = slugify(name).toLowerCase();

  let category = new Category({ name, slug });

  category.save((err, category) => {
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
        error: errorHandler(err),
      });
    }

    res.status(200).json({
      message: "get categories successed",
      categories,
    });
  });
};

const getCategory = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Category.findOne({ slug }).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    Blog.find({ categories: category })
      .populate("categories", "_id name slug")
      .populate("tags", "_id name slug")
      .populate("postedBy", "_id name")
      .select(
        "_id title slug excerpt categories tags postedBy createdAt updatedAt"
      )
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.status(200).json({
          message: "Get category successed",
          category,
          blogs: data,
        });
      });
  });
};

const delCategory = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Category.findOneAndDelete({ slug }).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.status(200).json({
      message: "Delete category successed",
    });
  });
};

module.exports = {
  createCategory,
  listOfCategories,
  getCategory,
  delCategory,
};
