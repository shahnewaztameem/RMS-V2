var express = require("express");
var faker = require("faker");
var bcrypt = require("bcrypt");
var userModel = require.main.require("./model/user-model");
var router = express.Router();
const saltRounds = 10;
router.get("*", function (req, res, next) {
  if (req.session.user_id != null) {
    next();
  } else {
    res.redirect("/login");
  }
});
router.get("/", (req, res) => {
  userModel.get(req.session.user_id, result => {
    var data = {
      user_info: result,
      user_id: req.session.user_id,
      username: req.session.user_name
    };
    res.render("admin/index", data);
  });
});

//user list route
router.get("/fakeuser", (req, res) => {
  var data = {
    errors: req.session.errors,
    success: req.session.success,
    user_name: faker.name.lastName(),
    email: faker.internet.email(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    username: req.session.user_name
  };
  req.session.errors = null;
  req.session.success = null;
  res.render("admin/fakeuser", data);
});

//user list route
router.get("/user_list", (req, res) => {
  userModel.getAll(function (results) {
    var data = {
      admin_id: req.session.user_id,
      username: req.session.user_name,
      uList: results
    };
    res.render("admin/user_list", data);
  });
});

router.get("/delete/:id", function (req, res) {
  userModel.delete(req.params.id, function (status) {
    res.redirect("/home-admin/user_list");
  });
});

//user individual edit
router.get("/user_edit/:id", function (req, res) {
  userModel.get(req.params.id, function (result) {
    res.render("admin/user_edit", {
      user_info: result,
      username: req.session.user_name
    });
  });
});
router.post("/user_edit/:id", function (req, res) {
  var user = {
    user_id: req.params.id,
    user_type: req.body.user_type
  };

  userModel.IndividualUserUpdate(user, function (status) {
    if (status) {
      res.redirect("/home-admin/user_list");
    } else {
      res.redirect("/home/user_edit/" + req.params.id);
    }
  });
});

//edit admin profile
router.get("/admin-edit_account", (req, res) => {
  userModel.get(req.session.user_id, result_info => {
    if (result_info.id != null) {
      var data = {
        user_info: result_info,
        errors: req.session.errors,
        username: req.session.user_name
      };
      res.render("admin/edit_profile", data);
    } else {
      res.redirect("/home-admin");
    }
  });
});

router.post("/admin-edit_account", (req, res) => {
  // bcrypt.genSalt(10, function(err, salt) {
  //   bcrypt.hash(req.body.password, salt, function(err, hash) {
  //     req.body.password = hash;
  //   });
  // });
  req
    .check("firstname", "Empty First name")
    .notEmpty()
    .rtrim();
  req
    .check("lastname", "Empty last name")
    .notEmpty()
    .rtrim();
  req.check("email", "Invalid e-mail").isEmail();
  req.check("password", "Invalid password length").isLength({
    min: 6
  });

  var err = req.validationErrors();
  if (!err) {
    req.session.errors = null;
    var update_user = {
      user_id: req.session.user_id,
      username: req.body.username,
      user_firstname: req.body.firstname,
      user_lastname: req.body.lastname,
      user_email: req.body.email,
      user_type: req.body.user_type,
      user_password: req.body.password,
      user_gender: req.body.u_gender
    };
    bcrypt.hash(update_user.user_password, saltRounds, function (err, hash) {
      update_user.user_password = hash;
      userModel.update(update_user, user_update_status => {
        if (user_update_status) {
          res.redirect("/home-admin");
        } else {
          res.redirect("/home-admin/admin-edit_account");
        }
      });
    });
    //update user_info table information
    // userModel.update(update_user, user_update_status => {
    //   if (user_update_status) {
    //     res.redirect("/home-admin");
    //   } else {
    //     res.redirect("/home-admin/admin-edit_account");
    //   }
    // });
  } else {
    req.session.errors = err;
    res.redirect("/home-admin/admin-edit_account");
  }
});

//add users get
router.get("/add_users", (req, res) => {
  var err = {
    errors: req.session.errors,
    success: req.session.success,
    username: req.session.user_name
  };
  req.session.errors = null;
  req.session.success = null;

  res.render("admin/add_users", err);
});

//add a new user

router.post("/add_users", (req, res) => {
  // req
  //   .checkBody("username", "Username field can not be empty")
  //   .notEmpty()
  //   .rtrim();
  // req
  //   .checkBody("username", "Username must be between 4-15 characters long")
  //   .len(4, 15);
  // req
  //   .checkBody("firstname", "Empty Firstname")
  //   .notEmpty()
  //   .rtrim();
  // req
  //   .checkBody("lastname", "Empty LastName")
  //   .notEmpty()
  //   .rtrim();
  // req.checkBody("email", "Invalid e-mail address.Please try again").isEmail();
  // req
  //   .checkBody("email", "Email address must be between 4-100 characters long")
  //   .len(4, 100);
  // req
  //   .checkBody("password", "Passwords must be between 6-100 characters long")
  //   .len(6, 100);
  // req
  //   .checkBody(
  //     "confirm_pass",
  //     "Confirm password must be between 6-100 characters long"
  //   )
  //   .len(6, 100);
  // req
  //   .checkBody("confirm_pass", "password do not match, please try again")
  //   .equals(req.body.password);
  // // req.check("username", "Empty username").notEmpty().rtrim;
  // // req
  // //   .check("firstname", "Empty Firstname")
  // //   .notEmpty()
  // //   .rtrim();
  // // req
  // //   .check("lastname", "Empty LastName")
  // //   .notEmpty()
  // //   .rtrim();
  // // req.check("email", "Invalid e-mail address").isEmail();
  // // req
  // //   .check("password", "Missmatched password or length less than 6")
  // //   .isLength({
  // //     min: 6
  // //   })
  // //   .equals(req.body.confirm_pass);
  // var err = req.validationErrors();
  // if (!err) {
  //   // var user = {
  //   //   username: req.body.username,
  //   //   user_firstname: req.body.firstname,
  //   //   user_lastname: req.body.lastname,
  //   //   user_email: req.body.email,
  //   //   user_type: req.body.user_type,
  //   //   user_password: req.body.password,
  //   //   user_gender: req.body.u_gender
  //   // };
  //   var user = {
  //     username: req.body.username,
  //     user_firstname: req.body.firstname,
  //     user_lastname: req.body.lastname,
  //     user_email: req.body.email,
  //     user_type: req.body.user_type,
  //     user_password: req.body.password,
  //     user_gender: req.body.u_gender
  //   };
  //   bcrypt.hash(user.user_password, saltRounds, function (err, hash) {
  //     user.user_password = hash;
  //     userModel.insert(user, function (results) {
  //       if (results) {
  //         req.session.success = "User added!!";
  //         res.redirect("/home-admin/user_list");
  //       } else {
  //         req.session.success = "Probelm with add new user";
  //         res.redirect("/home-admin/user_list");
  //       }
  //     });
  //   });
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      req.body.password = hash;
    });
  });
  req
    .checkBody("username", "Username field can not be empty")
    .notEmpty()
    .rtrim();
  req
    .checkBody("username", "Username must be between 4-15 characters long")
    .len(4, 15);
  req
    .checkBody("firstname", "Empty Firstname")
    .notEmpty()
    .rtrim();
  req
    .checkBody("lastname", "Empty LastName")
    .notEmpty()
    .rtrim();
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
          req.session.success = "User added!!";
          res.redirect("/home-admin/add_users");
        } else {
          req.session.success = "Probelm with add new user";
          res.redirect("/home-admin/user_list");
        }
      });
    });
    console.log(user);
    // userModel.insert(user, function (results) {
    //   if (results) {
    //     req.session.success = "User added!!";
    //     res.redirect("/home-admin/user_list");
    //   } else {
    //     req.session.success = "Probelm with add new user";
    //     res.redirect("/home-admin/user_list");
    //   }
    // });
  } else {
    req.session.errors = err;
    res.redirect("/home-admin/add_users");
  }
});

//add restaurants & menus
router.get("/add_restaurants", (req, res) => {
  var data = {
    errors: req.session.errors,
    username: req.session.user_name
  };
  res.render("admin/add_restaurants", data);
});

// add restaurent
router.post("/add_restaurants", (req, res) => {
  req
    .check("count", "add 2 item")
    .rtrim()
    .isDivisibleBy(2);

  var err = req.validationErrors();
  if (!err) {
    var data = {
      r_name: req.body.r_name,
      r_loc: req.body.r_location,
      r_details: req.body.r_about,
      item1: req.body.item1,
      item1_d: req.body.about1
    };

    userModel.insertIntoRestaurant(data, status => {
      if (status) {
        userModel.getRestaurant(data, function (result) {
          if (result) {
            var data = {
              item1: req.body.item1,
              item1_d: req.body.about1,
              item2: req.body.item2,
              item2_d: req.body.about2,
              id: result.r_id
            };
            userModel.insertIntoRestaurantItem(data, function (st) {
              if (st) {
                res.redirect("/home-admin/restaurants_list");
              }
            });
          }
        });
      } else {
        res.redirect("/home-admin/add_restaurants");
      }
    });
  } else {
    req.session.errors = err;
    res.redirect("/home-admin/add_restaurants");
  }
});
//get restaurant list
router.get("/restaurants_list", (req, res) => {
  userModel.getAllRestaurant(function (result) {
    if (result.length) {
      var data = {
        r_list: result,
        username: req.session.user_name
      };
      res.render("admin/restaurants_list", data);
    }
  });
});

//add item
router.post("/add-item/:id", (req, res) => {
  var data = {
    r_id: req.params.id,
    i_name: req.body.i_n,
    i_detail: req.body.i_d
  };
  userModel.addItem(data, status => {
    res.redirect("/home-admin/restaurants_list");
  });
});

//edit restaurant info and menus
router.get("/edit/:id", (req, res) => {
  userModel.getRestaurantInfo(req.params.id, r_results => {
    req.session.r_id = r_results.r_id;
    if (r_results.length != 0) {
      userModel.getAllItems(req.params.id, i_results => {
        if (i_results.length != 0) {
          var data = {
            r_info: r_results,
            i_info: i_results,
            errors: req.session.errors,
            username: req.session.user_name
          };
          res.render("admin/edit_restaurant", data);
        }
      });
    } else {
      res.redirect("/home-admin/restaurants_list");
    }
  });
});
//edit restaurant info
router.post("/edit-restaurant/:id", (req, res) => {
  var data = {
    id: req.params.id,
    r_name: req.body.r_n,
    r_location: req.body.r_loc,
    r_details: req.body.r_d
  };
  userModel.updateRestaurant(data, status => {
    res.redirect("/home-admin/restaurants_list");
  });
});
//edit restaurant info and menus
router.get("/edit/:id", (req, res) => {
  userModel.getRestaurantInfo(req.params.id, r_results => {
    req.session.r_id = r_results.r_id;
    if (r_results.length != 0) {
      userModel.getAllItems(req.params.id, i_results => {
        if (i_results.length != 0) {
          var data = {
            r_info: r_results,
            i_info: i_results,
            errors: req.session.errors
          };
          res.render("admin/edit_restaurant", data);
        }
      });
    } else {
      res.redirect("/home-admin/restaurants_list");
    }
  });
});

//edit restaurant info
router.post("/edit-restaurant/:id", (req, res) => {
  var data = {
    id: req.params.id,
    r_name: req.body.r_n,
    r_location: req.body.r_loc,
    r_details: req.body.r_d
  };
  userModel.updateRestaurant(data, status => {
    res.redirect("/home-admin/restaurants_list");
  });
});

//edit item
router.post("/edit-item/:id", (req, res) => {
  var data = {
    id: req.params.id,
    i_name: req.body.i_n,
    i_detail: req.body.i_d
  };
  userModel.updateItem(data, status => {
    res.redirect("/home-admin/edit/" + req.session.r_id);
  });
});

//delete item
router.get("/delete-item/:id", (req, res) => {
  userModel.deleteItem(req.params.id, status => {
    res.redirect("/home-admin/edit/" + req.session.r_id);
  });
});

//delete restaurant
router.get("/delete-restaurant/:id", (req, res) => {
  userModel.deleteRestaurants(req.params.id, status => {
    res.redirect("/home-admin/restaurants_list");
  });
});

//view restaurants
router.get("/view-restaurant", (req, res) => {
  userModel.getRestaurantByLocation(req.session.u_loc, results => {
    var data = {
      r_list: results,
      username: req.session.user_name
    };
    res.render("admin/view_restaurant_list", data);
  });
});

//view restaurants
router.get("/contact_list", (req, res) => {
  userModel.getAllFromContact(req.session.user_id, result => {
    var data = {
      user_info: result,
      user_id: req.session.user_id,
      username: req.session.user_name
    };
    res.render("admin/contact_list", data);
  });
});
router.get("/deleteMessage/:id", function (req, res) {
  userModel.deleteMessage(req.params.id, function (status) {
    res.redirect("/home-admin/contact_list");
  });
});

// router.get("/all_reservations", function (req, res) {
//   userModel.getAllReservation(req.session.user_id, result => {
//     var data = {
//       username: req.session.user_name,
//       user_id: req.session.user_id
//     };
//     res.render("admin/reservation_list", data);
//   });
router.get("/all_reservations", (req, res) => {
  userModel.getAllReservation(req.session.user_id, result => {
    var data = {
      reservation_details: result,
      user_id: req.session.user_id,
      username: req.session.user_name
    };
    res.render("admin/reservation_list", data);
  });
});

router.get("/reservation_edit/:id", function (req, res) {
  userModel.getReservation(req.params.id, function (result) {
    res.render("admin/reservation_edit", {
      reservation_details: result,
      user_id: req.session.user_id,
      username: req.session.user_name
    });
  });
});

router.post("/reservation_edit/:id", function (req, res) {
  var data = {
    id: req.params.id,
    phone_no: req.body.phone_no,
    total_guest: req.body.total_guest,
    reservation_status: req.body.reservation_status
  };
  userModel.ReservationUpdate(data, function (status) {
    if (status) {
      res.redirect("/home-admin/all_reservations");
    } else {
      res.redirect("/home-admin/reservation_edit/" + req.params.id);
    }
  });
});

// delete reservation
router.get("/delete_reservation/:id", (req, res) => {
  userModel.deleteReservation(req.params.id, status => {
    res.redirect("/home-admin/all_reservations");
  });
});

module.exports = router;