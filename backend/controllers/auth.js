const User = require("../models/User");
const shortId = require("shortid");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({ error: "Email is taken" });
    }

    const { name, email, password } = req.body;
    let username = shortId();
    let profile = `${process.env.CLIENT_URL}/profile/${username}`;

    const newUser = new User({ email, name, password, username, profile });
    newUser.save((err, user) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }

      res.status(201).json({
        user,
        message: "Signup success.",
        error: err,
      });
    });
  });
};

const signin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (err || !user)
      return res
        .status(404)
        .json({ error: "User with that email does not exist! Please signup." });

    const isMatch = user.authenticate(password);

    if (!isMatch) {
      return res.status(401).json({ error: "Password not Match!" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { expiresIn: "id" });

    const { _id, email, name, role, username } = user;

    return res.status(200).json({
      success: true,
      user: { _id, email, name, role, username },
      token,
      error: err,
    });
  });
};

const signout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({
    success: true,
    user: {},
    message: "User signedout success.",
  });
};

const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
});

const authMiddleware = (req, res, next) => {
  const userId = req.user._id;
  User.findById({ _id: userId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

const adminMiddleware = (req, res, next) => {
  const adminId = req.user._id;
  User.findById({ _id: adminId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    if (user.role !== 1) {
      return res.status(400).json({
        error: "Admin redource, Access denied",
      });
    }
    res.profile = user;
    next();
  });
};

module.exports = {
  signup,
  signin,
  signout,
  requireSignin,
  authMiddleware,
  adminMiddleware,
};
