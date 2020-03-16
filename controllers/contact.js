var express = require('express');
var userModel = require.main.require('./model/user-model');
var router = express.Router();

router.post('/', (req, res) => {

    req.check('email', 'Invalid e-mail address').isEmail();
    req.check('message', 'Empty Message').notEmpty();

    var err = req.validationErrors();

    if (!err) {
        req.session.errors = null;
        var user = {
            user_email: req.body.email,
            user_message: req.body.message
        };
        userModel.insertIntoForm(user, function (results) {
            if (results) {
                req.session.success = 'message send!';
                res.redirect('/contact');
            } else {
                req.session.success = 'Probelm with sending message'
                res.redirect('/contact');
            }
        });
    } else {
        req.session.errors = err;
        res.redirect('/contact');
    }

});
//ROUTES
router.get('/', (req, res) => {
    var error = {
        errors: req.session.errors,
        success: req.session.success,
        title: "Contact"
    };
    req.session.errors = null;
    req.session.success = null;
    res.render('contact', error);
});


module.exports = router;