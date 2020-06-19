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
const { trace } = require("console");
const { findOne } = require("../models/Blog");

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
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const skip = req.query.skip ? parseInt(req.query.skip) : 0;
  console.log(limit);
  console.log(skip);
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
    res.status(200).json({
      success: true,
      size: blogs.length,
      blogs,
      categories,
      tags,
      erorr: [],
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};

const getBlog = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  try {
    const blog = await Blog.findOne({ slug })
      .populate("categories", "_id name slug")
      .populate("tags", "_id name slug")
      .populate("postedBy", "_id name username")
      .select(
        "_id title body slug mtitle mdesc excerpt categories tags postedBy createdAt updatedAt"
      )
      .exec();

    res.status(200).json({
      success: true,
      blog,
      erorr: [],
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};

const deleteBlog = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  try {
    await Blog.findOneAndDelete({ slug }).exec();
    res.status(200).json({
      success: true,
      message: "Delete blog successed",
      data: [],
      erorr: [],
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};

const updateBlog = (req, res) => {
  let slug = req.params.slug.toLowerCase();

  Blog.findOne({ slug }).exec((err, blog) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
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

      let slugBeforMerge = blog.slug;
      blog = _.merge(blog, fields);
      blog.slug = slugBeforMerge;

      const { desc, body, categories, tags } = fields;

      if (body) {
        blog.excerpt = smartTrim(body, 200, " ", " ...");
        blog.mdesc = stripHtml(body.substring(0, 160));
      }

      if (categories) {
        blog.categories = categories.split(",");
      }

      if (tags) {
        blog.tags = tags.split(",");
      }

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
      blog.save((err, updatedBlog) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.status(202).json({
          success: true,
          updatedBlog,
          erorr: [],
        });
      });
    });
  });
};

const getPhoto = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  try {
    const blog = await Blog.findOne({ slug }).select("photo").exec();
    if (!blog) res.status(404).json({ error: "Blog not found!" });
    res.set("Content-Type", blog.photo.contentType);
    res.status(200).json({
      success: true,
      photo: blog.photo.data,
    });
  } catch (err) {
    res.status(404).json({ error: "errorHandler(err)" });
  }
};

module.exports = {
  getBlogs,
  createBlog,
  listAllBlogsCategoriesTags,
  getBlog,
  deleteBlog,
  updateBlog,
  getPhoto,
};
