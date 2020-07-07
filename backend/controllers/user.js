const User = require("../models/User");
const Blog = require("../models/Blog");
const errHandler = require("../helpers/dbHandleError");

const read = (req, res) => {
  req.profile.hashed_password = undefined;
  return res.status(200).json(req.profile);
};

const publicProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username }).exec();
    user.photo = undefined;
    const blogs = await Blog.find({ postedBy: user._id })
      .populate("postedBy", "_id username name email role photo")
      .populate("categories", "_id name slug")
      .populate("tags", "_id name slug")
      .select("title _id");
    res.status(200).json({
      user,
      blogs,
    });
  } catch (error) {
    res.status(400).json({ error: errHandler(error) });
  }
};

module.exports = {
  read,
  publicProfile,
};
