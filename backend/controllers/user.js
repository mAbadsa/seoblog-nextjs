const fs = require("fs");
const _ = require("lodash");
const formidable = require("formidable");
const errHandler = require("../helpers/dbHandleError");

const User = require("../models/User");
const Blog = require("../models/Blog");

const read = (req, res) => {
  req.profile.hashed_password = undefined;
  return res.status(200).json(req.profile);
};

const publicProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username }).exec();
    user.photo = undefined;
    user.hashed_password = undefined;
    const blogs = await Blog.find({ postedBy: user._id })
      .populate("postedBy", "_id username name email role photo")
      .populate("categories", "_id name slug")
      .populate("tags", "_id name slug")
      .select("title _id createdAt updateAt");
    res.status(200).json({
      user,
      blogs,
    });
  } catch (error) {
    res.status(400).json({ error: errHandler(error) });
  }
};

const updateUser = () => {
  let form = formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not upload",
      });
    }
    let user = req.profile;
    user = _.extend(user, fields);

    if (files.photo) {
      if (files.photo.size >= 10000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size.",
        });
      }
      user.photo.data = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
    }

    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: "Image could not upload",
        });
      }
      user.hashed_password = undefined;
      res.status(200).json(user);
    });
  });
};

const getPhoto = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (user.photo.data) {
      res.set("Content-Type", user.photo.contentType);
      res.send(user.photo.data);
    }
  } catch (error) {
    if (!user) {
      res.status(404).json({ error: "user not found" });
    }
    res.status(404).json({ error });
  }
};

module.exports = {
  read,
  publicProfile,
  updateUser,
  getPhoto,
};
