require("../models/user");
require("dotenv").config();
const mongoose = require("mongoose");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const mailgun = require("mailgun-js");
const user = require("../models/user");
const { json } = require("body-parser");
const Domain = process.env.DOMAIN;
const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: Domain });

const User = mongoose.model("User");

module.exports.register = (req, res, next) => {
  var user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = user.encryptPassword(req.body.password);

  user.save((err, result) => {
    if (!err) {
      res.send(result);
    } else {
      if (err.code == 11000) {
        return res.status(422).json({
          status: false,
          message: "email address is already registered",
        });
      } else {
        return next(err);
      }
    }
  });
};
module.exports.activateAccount = (req, res) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATE, function (
      err,
      decodedToken
    ) {
      if (err) {
        return res.status(400).json({ error: "Incorrect or expired link" });
      }
      const { name, email, password } = decodedToken;
      User.findOne({ email }).exec((err, user) => {
        if (user) {
          return res
            .status(400)
            .json({ error: "user with this email is already exist" });
        }
        let newUser = new User({ name, email, password });
        newUser.save((err, success) => {
          if (err) {
            console.log("Error in signup while account activation: ", err);
            return (
              res.status(400),
              json({ error: "Error in activating the account" })
            );
          }
          res.json({ message: "signup success!" });
        });
      });
    });
  } else {
    return res.json({ error: "Something went wrong" });
  }
};
module.exports.authenticate = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    //error from passport middleware
    if (err) {
      return res.status(400).json(err);
      //return res.status(400).json({status: false, message: 'Wrong Credentials'});
    } else if (user) {
      return res
        .status(200)
        .json({ status: true, user: _.pick(user, ["name"]) });
      return res.status(200).json({ token: user.generateJwt() });
    } else {
      return res.status(404).json(info);
      //return res.status(404).json({ status: false, message: "Wrong Credentials" });
    }
  })(req, res);
};

module.exports.forgetPassword = (req, res) => {
  const { email } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: "User with This email address does not exist" });
    }
    // const token=jwt.sign({name,email,password}, 'jwtaccountactivate012345678', {expiresIn:'20m'});
    const token = user.generateJwt();
    const data = {
      from: "noreply@email.com",
      to: email,
      subject: " Password Reset Link with Ebony Library",
      html: `Please click on the following link to Reset your Password, 
                   <strong>Kindly NOTE: The link is valid for 20 minutes.</strong> 
                   <a href="http://localhost:4400/verificationEmail/${token}" class="button">Click here</a>`,
    };
    return user.updateOne({ resetLink: token }, function (err, success) {
      if (err) {
        return res.status(400).json({ error: "Reset link error" });
      } else {
        mg.messages().send(data, function (error, body) {
          if (err) {
            return res.json({ error: err.message });
          }
          return res.json({
            message:
              " Email has been sent with an activation link, please check ",
          });
        });
      }
    });
  });
};

module.exports.resetPassword = (req, res) => {
  const { resetLink, newPassword } = req.body;
  if (resetLink) {
    jwt.verify(resetLink, process.env.JWT_ACCOUNT_ACTIVATE, function (
      error,
      decodedData
    ) {
      if (error) {
        return res
          .status(401)
          .json({ error: "Incorrect Token or it is expired" });
      }
      User.findOne({ resetLink }, (err, user) => {
        if (err || !user) {
          return res
            .status(400)
            .json({ error: "User with This email address does not exist" });
        }
        const obj = {
          password: newPassword,
          resetLink: "",
        };
        user = _.extend(user, obj);
        user.save((err, result) => {
          if (err) {
            return res.status(400).json({ error: "reset password error" });
          } else {
            return res
              .status(200)
              .json({ message: "Your Password has been changed" });
          }
        });
      });
    });
  } else {
    return res.status(401).json({ error: "Authentication error !!!" });
  }
};
