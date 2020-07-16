const User = require("../models/User");
const shortId = require("shortid");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const errorHandler = require("../helpers/dbHandleError");
const Blog = require("../models/Blog");
const sendGridMail = require("@sendgrid/mail");
const _ = require("lodash");

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

const preSignup = (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (user) {
      return res.status(400).json({ error: "Email is taken" });
    }

    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION_SECRET,
      {
        expiresIn: "10m",
      }
    );

    console.log(token);

    const resetUrl = `${process.env.CLIENT_URL}/auth/account/activate/${token}`;

    const emailContent = {
      to: email,
      from: process.env.EMAIL_FROM,
      subject: `Account activation link`,
      html: `
            <hr/>
            <h4>Account activation link.</h4>
            <p>Click this link to activate you account:</p>
            <p> ${resetUrl} </p>
            <hr/>
            <p>This email may contain sensetive information</p>
            <p>https://www.seoblog.com</p>
        `,
    };

    sendGridMail.send(emailContent).then((sent) => {
      res.status(200).json({
        success: true,
        messgae: `Email has been sent to ${email}. Follow the instructions to activate your account. Link expires in 10min.`,
      });
    });
  });
};

// const signup = (req, res) => {
//   User.findOne({ email: req.body.email }).exec((err, user) => {
//     if (user) {
//       return res.status(400).json({ error: "Email is taken" });
//     }

//     const { name, email, password } = req.body;
//     let username = shortId();
//     let profile = `${process.env.CLIENT_URL}/profile/${username}`;

//     const newUser = new User({ email, name, password, username, profile });
//     newUser.save((err, user) => {
//       if (err) {
//         return res.status(400).json({
//           error: err,
//         });
//       }

//       res.status(201).json({
//         user,
//         message: "Signup success.",
//         error: err,
//       });
//     });
//   });
// };

const signup = (req, res) => {
  const token = req.body.token;

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ACCOUNT_ACTIVATION_SECRET,
      function (err, decoded) {
        if (err) {
          return res.status(401).json({
            error: "Expired link, signup again.",
          });
        }

        const { name, email, password } = jwt.decode(token);

        let username = shortId();
        let profile = `${process.env.CLIENT_URL}/profile/${username}`;

        const user = new User({ name, email, password, username, profile });

        user.save((err, resulr) => {
          if (err) {
            return res.status(400).json({ error: errorHandler(err) });
          }
          res.status(201).json({
            message: "Signup success.",
          });
        });
      }
    );
  } else {
    return res.status(300).json({
      error: "Something went wrong, try again.",
    });
  }
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

    res.cookie("token", token, { expiresIn: "1d" });

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
  algorithms: ["RS256"],
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

const canUpdateDeleteBlog = (req, res, next) => {
  const slug = req.params.slug.toLowerCase();
  Blog.findOne({ slug }).exec((err, blog) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    let authorizedUser =
      blog.postedBy._id.toString() === req.profile._id.toString();
    if (!authorizedUser) {
      return res.status(400).json({ error: "You are not authorized" });
    }
    next();
  });
};

const forgetPassword = (req, res) => {
  const { email } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: "User with that email does not exist!" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, {
      expiresIn: "10m",
    });

    console.log(token);

    // reset url
    const resetUrl = `${process.env.CLIENT_URL}/auth/password/reset/${token}`;

    const emailContent = {
      to: email,
      from: process.env.EMAIL_FROM,
      subject: `Reset Password Link Generatored`,
      html: `
          <hr/>
          <h4>Reset Password Link.</h4>
          <p>Click this link to reset password:</p>
          <p> ${resetUrl} </p>
          <hr/>
          <p>This email may contain sensetive information</p>
          <p>https://www.seoblog.com</p>
      `,
    };

    user.updateOne({ resetPasswordToken: token }, (err, success) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      } else {
        sendGridMail.send(emailContent).then((sent) => {
          res.status(200).json({
            message: `Email has been sent to ${email}. Follow the instructions to reset your password. Link expires in 10min.`,
          });
        });
      }
    });
  });
};

const resetPassword = (req, res) => {
  const { resetPasswordToken, newPassword } = req.body;

  jwt.verify(resetPasswordToken, process.env.JWT_RESET_PASSWORD, function (
    err,
    decoded
  ) {
    if (err) {
      return res.status(401).json({ error: "Expired link. Try again" });
    }

    User.findOne({ resetPasswordToken }, (err, user) => {
      if (err || !user) {
        return res
          .status(400)
          .json({ error: "Something went Error, Try later." });
      }

      const updateFields = {
        password: newPassword,
        resetPasswordToken: "",
      };

      user = _.extend(user, updateFields);

      user.save((err, result) => {
        if (err) {
          return res.status(400).json({ error: errorHandler(err) });
        }

        res.status(201).json({
          success: true,
          message: "Password is changed. You can login by new password.",
        });
      });
    });
  });
};

module.exports = {
  signup,
  signin,
  signout,
  requireSignin,
  authMiddleware,
  adminMiddleware,
  canUpdateDeleteBlog,
  forgetPassword,
  resetPassword,
  preSignup,
};
