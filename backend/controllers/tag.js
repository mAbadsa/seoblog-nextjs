const slugify = require("slugify");
const Tag = require("../models/Tag");
const { errorHandler } = require("../helpers/dbHandleError");
const Blog = require("../models/Blog");

const getTags = (req, res) => {
  Tag.find().exec((err, tags) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    res.status(200).json({
      messgae: "Get tags success",
      tags,
    });
  });
};

const createTag = (req, res) => {
  const { name } = req.body;
  const slug = slugify(name).toLowerCase();

  const tag = new Tag({ name, slug });

  tag.save((err, tag) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    res.status(200).json({
      messgae: "Add new tag success",
      data: tag,
    });
  });
};

const getTag = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Tag.findOne({ slug }).exec((err, tag) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    Blog.find({ tags: tag })
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
          messgae: "Get the tag success",
          tag,
          blogs: data,
        });
      });
  });
};

const delTag = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Tag.findOneAndDelete({ slug }).exec((err, tag) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    res.status(200).json({
      messgae: "Delete the tag success",
      data: [],
    });
  });
};

module.exports = {
  getTags,
  createTag,
  getTag,
  delTag,
};
