const fs = require("fs");
const mongoose = require("mongoose");
const slugify = require("slugify");
const formidable = require("formidable");
const _ = require("lodash");
const stripHtml = require("string-strip-html");
const errorHandler = require("../helpers/dbHandleError");
const { smartTrim } = require("../helpers/smartTrim");

const Blog = require("../models/Blog");
const User = require("../models/User");
const Category = require("../models/Category");
const Tag = require("../models/Tag");

const getBlogs = async (req, res) => {
  const blogs = await Blog.find({})
    // .populate({ path: "postedBy", select: "_id name slug", options: { limit: 2 } })
    .populate("categories", "_id name slug")
    .populate("tags", "_id name slug")
    .populate("postedBy", "_id name username")
    .select(
      "_id title slug excerpt categories tags postedBy createdAt updatedAt"
    )
    .exec();
  const count = await Blog.find({}).countDocuments();
  try {
    res.json({
      success: true,
      count,
      data: blogs,
      erorr: [],
    });
  } catch (err) {
    return res.json({
      error: errorHandler(err),
    });
  }
};

const createBlog = (req, res) => {
  let form = new formidable.IncomingForm();
  // console.log(form);
  form.keepExtensions = true;
  // console.log("line 32:", form);
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not upload",
      });
    }
    const { title, body, categories, tags } = fields;
    if (!title || !title.length) {
      return res.status(400).json({
        error: "Title is required",
      });
    }

    if (!body || body.length < 200) {
      return res.status(400).json({
        error: "Content is too short",
      });
    }

    if (!categories || !categories.length === 0) {
      return res.status(400).json({
        error: "At least one category is required",
      });
    }

    if (!tags || !tags.length === 0) {
      return res.status(400).json({
        error: "At least one tag is required",
      });
    }

    let blog = new Blog();
    blog.title = title;
    blog.body = body;
    blog.excerpt = smartTrim(body, 200, " ", " ...");
    blog.slug = slugify(title).toLowerCase();
    blog.mtitle = `${title} | ${process.env.APP_NAME}`;
    blog.mdesc = stripHtml(body.substring(0, 160));
    blog.postedBy = req.user._id;

    let categoriesArray = categories && categories.split(",");
    let tagsArray = tags && tags.split(",");

    if (files.photo) {
      if (files.photo.size >= 10000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size.",
        });
      }
      blog.photo.data = fs.readFileSync(files.photo.path);
      blog.photo.contentType = files.photo.type;
      // console.log("Files >>>> ", files);
    }

    blog.save((err, data) => {
      if (err) {
        return res.status(400).json({
          success: false,
          data: [],
          error: errorHandler(err),
        });
      }

      Blog.findByIdAndUpdate(
        data._id,
        { $push: { categories: { $each: categoriesArray } } },
        { new: true }
      ).exec((err, blog) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        } else {
          Blog.findByIdAndUpdate(
            data._id,
            { $push: { tags: tagsArray } },
            { new: true }
          ).exec((err, blog) => {
            if (err) {
              return res.status(400).json({
                error: errorHandler(err),
              });
            } else {
              res.status(200).json({
                success: true,
                blog,
              });
            }
          });
        }
      });
    });
  });
};

const listAllBlogsCategoriesTags = async (req, res) => {
  const limit = req.body.limit ? parseInt(req.body.limit) : 10;
  const skip = req.body.skip ? parseInt(req.body.skip) : 0;

  try {
    const blogs = await Blog.find({})
      .populate("categories", "_id name slug")
      .populate("tags", "_id name slug")
      .populate("postedBy", "_id name username")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select(
        "_id title slug excerpt categories tags postedBy createdAt updatedAt"
      )
      .exec();
    const categories = await Category.find({}).exec();
    const tags = await Tag.find({}).exec();

    return res.status(200).json({
      success: true,
      count,
      blogs,
      tags,
      categories,
      size: blogs.length,
      erorr: [],
    });
  } catch (error) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};

module.exports = {
  getBlogs,
  createBlog,
  listAllBlogsCategoriesTags,
};
