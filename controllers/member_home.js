var express = require('express');
var userModel = require.main.require('./model/user-model');
var router = express.Router();
var multer = require('multer');
router.get('*', function (req, res, next) {
    if (req.session.user_id != null) {
        next();
    } else {
        res.redirect('/login');
    }
});







router.get('/', (req, res) => {
    userModel.get(req.session.user_id, (result) => {
        var data = {
            user_info: result
        };
        res.render('member/index', data);
    });
});


//user list route


router.get('/index', (req, res) => {

    userModel.getAll(function (results) {
        var data = {
            member_id: req.session.user_id,
            username: req.session.user_name,
            uList: results
        };
        res.render('member/index', data);
    });
});







//edit member profile
router.get('/member-edit_account', (req, res) => {
    userModel.get(req.session.user_id, (result_info) => {
        if (result_info.id != null) {
            var data = {
                user_info: result_info,
                errors: req.session.errors,
                username: req.session.user_name
            };
            res.render('member/edit_profile', data);
        } else {
            res.redirect('/home-member')
        }
    });
});

router.post('/member-edit_account', (req, res) => {

    req.check('firstname', 'Empty First name').notEmpty().rtrim();
    req.check('lastname', 'Empty last name').notEmpty().rtrim();
    req.check('email', 'Invalid e-mail').isEmail();
    req.check('password', 'Invalid password length').isLength({
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

        //update user_info table information
        userModel.update(update_user, (user_update_status) => {
            if (user_update_status) {
                res.redirect('/home-member');
            } else {
                res.redirect('/home-member/member-edit_account');
            }
        });
    } else {
        req.session.errors = err;
        res.redirect('/home-member/member-edit_account');
    }
});




module.exports = router;