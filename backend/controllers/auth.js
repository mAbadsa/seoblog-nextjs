const User = require("../models/User");
const shortId = require("shortid");

const signup = async (req, res) => {
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
      });
    });
  });
};

module.exports = {
  signup,
};
