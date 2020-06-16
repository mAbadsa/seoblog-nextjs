const slugify = require("slugify");
const Tag = require("../models/Tag");
const { errorHandler } = require("../helpers/dbHandleError");

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

    res.status(200).json({
      messgae: "Get the tag success",
      data: tag,
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
