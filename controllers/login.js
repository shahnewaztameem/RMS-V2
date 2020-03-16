var express = require('express');
var userModel = require.main.require('./model/user-model');
var bcrypt = require("bcrypt");
var router = express.Router();

//ROUTES
router.get('/', (req, res) => {
    var error = {
        errors: req.session.errors,
        success: req.session.success,
        title: "Login"
    };
    req.session.errors = null;
    req.session.success = null;
    res.render('login/index', error);
});

router.post('/', (req, res) => {

    req.check('email', 'Invalid e-mail address').isEmail().trim();
    req.check('password', 'Password can not be empty').notEmpty().trim();

    var err = req.validationErrors();
    //var err = req.validationErrors(true);

    if (!err) {
        req.session.errors = null;
        var user = {
            user_email: req.body.email,
        };
        //var user = {
        //user_email: req.body.email,
        //user_pass: hash
        //};

        userModel.validate(user, function (result) {
            // password hasing

            // bcrypt.compare(req.body.password, user.user_password, (err,matched) => {
            //     if(matched) {
            //         console.log("done");

            //     }
            //     else {
            //         throw err;
            //     }
            // })


            if (result.id != null) {

                req.session.user_id = result.id;
                //console.log(req.session.user_id);
                req.session.user_name = result.username;
                req.session.user_firstname = result.user_firstname;
                req.session.user_lastname = result.user_lastname;
                req.session.user_email = result.user_email;
                req.session.user_type = result.user_type;
                req.session.user_password = result.user_password;
                req.session.user_gender = result.user_gender;
                req.session.u_type = result.user_type;
                if (bcrypt.compareSync(req.body.password, result.user_password) == true) {
                    if (req.session.u_type == "admin") {
                        res.redirect('/home-admin');
                    } else if (req.session.u_type == "manager") {
                        res.redirect('/home-manager');
                    } else {
                        res.redirect('/home-member');
                    }

                } else {
                    req.session.success = "Invalid User credentials";
                    res.redirect('/login');
                }
                /*if (req.session.u_type == "admin") {
                    res.redirect('/home-admin');
                } else
                    res.redirect('/home-member');*/
            } else {
                req.session.success = "Invalid User";
                res.redirect('/login');
            }
        });
    } else {
        console.log(err);
        req.session.errors = err;
        res.redirect('/login');
    }

});

module.exports = router;