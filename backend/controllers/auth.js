const User = require('../models/User');

const getSignup = async (req, res) => {
  res.json({
    success: true,
    data: [],
    message: "Signup",
  });
};

module.exports = {
    getSignup,
};
