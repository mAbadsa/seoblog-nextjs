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
      data: tags,
    });
  });
};

const createTag = (req, res) => {
  const { name } = req.body;
  const tag = Tag({ name });

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

module.exports = {
  getTags,
  createTag,
};
