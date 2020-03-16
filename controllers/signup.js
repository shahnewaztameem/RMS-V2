var express = require("express");
var bcrypt = require("bcrypt");
var userModel = require.main.require("./model/user-model");
var router = express.Router();
const saltRounds = 10;
//ROUTES
router.get("/", (req, res) => {
  var err = {
    errors: req.session.errors,
    success: req.session.success,
    title: "Signup"
  };
  req.session.errors = null;
  req.session.success = null;
  res.render("signup/index", err);
});

//signup POST
router.post("/", (req, res) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      req.body.password = hash;
    });
  });
  req
    .checkBody("username", "Username field can not be empty")
    .notEmpty()
    .trim();
  req
    .checkBody("username", "Username must be between 5-15 characters long")
    .len(4, 15);
  req
    .checkBody("username", "Username can only contains letters and numbers")
    .matches(/^[a-zA-Z0-9]+$/, "i");

  req
    .checkBody("firstname", "Empty Firstname")
    .notEmpty()
    .trim();
  req
    .checkBody("firstname", "Your first name is not valid. Only characters A-Z, a-z are  acceptable")
    .matches(/^[a-zA-Z]+$/, "i");
  req
    .checkBody("lastname", "Empty LastName")
    .notEmpty()
    .trim();
  req
    .checkBody("lastname", "Your last name is not valid. Only characters A-Z, a-z are  acceptable")
    .matches(/^[a-zA-Z]+$/, "i");
  req.checkBody("email", "Invalid e-mail address.Please try again").isEmail();
  req
    .checkBody("email", "Email address must be between 4-100 characters long")
    .len(4, 100);
  req
    .checkBody("password", "Passwords must be between 6-100 characters long")
    .len(6, 100);
  req
    .checkBody(
      "confirm_pass",
      "Confirm password must be between 6-100 characters long"
    )
    .len(6, 100);
  req
    .checkBody("confirm_pass", "password do not match, please try again")
    .equals(req.body.password);
  // req.checkBody('password', 'Missmatched password or length less than 6').isLength({
  //     min: 6
  // }).equals(req.body.confirm_pass);
  var err = req.validationErrors();
  if (!err) {
    var user = {
      username: req.body.username,
      user_firstname: req.body.firstname,
      user_lastname: req.body.lastname,
      user_email: req.body.email,
      user_type: req.body.user_type,
      user_password: req.body.password,
      user_gender: req.body.u_gender
    };
    bcrypt.hash(user.user_password, saltRounds, function (err, hash) {
      user.user_password = hash;
      userModel.insert(user, function (results) {
        if (results) {
          req.session.success = "Successfully sign up...Now you can login!!";
          res.redirect("/signup");
        } else {
          req.session.success = "Probelm with signup..try again";
          res.redirect("/signup");
        }
      });
    });

    console.log(user);
    // userModel.insert(user, function (results) {
    //     if (results) {
    //         req.session.success = 'Successfully sign up...Now you can login!!';
    //         res.redirect('/signup');
    //     } else {
    //         req.session.success = 'Probelm with signup..try again'
    //         res.redirect('/signup');
    //     }
    // });
  } else {
    req.session.errors = err;
    res.redirect("/signup");
  }
});
module.exports = router;