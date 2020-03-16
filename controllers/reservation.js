var express = require('express');
var userModel = require.main.require('./model/user-model');
var router = express.Router();

router.get('*', function (req, res, next) {
    if (req.session.user_id != null) {
        next();
    } else {
        res.redirect('/login');
    }
});

//get


router.get('/', (req, res) => {
    userModel.getReservation(req.session.user_id, (result) => {
        var data = {
            r_info: result,
            u_type: req.session.u_type,
            username: req.session.user_name,
            user_email: req.session.user_email,
            u_id:req.session.user_id,

            staus:req.session.staus,
        };
        res.render('reservation', data);
    });
});


// router.get('/', (req, res) => {
//     userModel.getAllReservation((results) => {
//         var data = {
//             reservation_details: result,
//             u_type: req.session.u_type,
//             username: req.session.user_name,

//             u_id: req.session.user_id,

//             staus: req.session.staus,
//         };
//         res.render('reservation', data);
//     });
// });

//post
router.post('/', (req, res) => {
    var data = {


        u_id: req.session.user_id,
        u_name: req.session.u_name,
        u_emil: req.session.u_emil,
        date: req.body.date,
        time: req.body.time,
        phone_no: req.body.phone_no,
        total_guest: req.body.total_guest

    };
    userModel.insertReservation(data, (staus) => {
        res.redirect('/reservation');
    });
});

//delete reservation
router.get('/delete/:id', (req, res) => {
    userModel.deleteReservation(req.params.id, (status) => {
        res.redirect('/reservation');
    });
});




module.exports = router;

















//ROUTES
router.get('/', (req, res) => {
    var error = {
        errors: req.session.errors,
        success: req.session.success
    };
    req.session.errors = null;
    req.session.success = null;
    res.render('reservation', error);
});







//reservation POST
router.post('/', (req, res) => {
    req.check('username', 'Empty username').notEmpty().rtrim;
    req.check('date', 'Empty date').notEmpty().rtrim();
    req.check('time', 'Empty time').notEmpty().rtrim();
    req.check('email', 'Invalid e-mail address').isEmail();
    req.check('guests', 'Empty guests').notEmpty().rtrim();
    req.check('phone_number', 'Empty phone_number').notEmpty().rtrim();





    var err = req.validationErrors();
    if (!err) {
        var user = {
            username: req.body.username,
            date: req.body.date,
            time: req.body.time,
            user_email: req.body.email,
            guest: req.body.guests,
            phone_no: req.body.phone_number
        };
        console.log(user);
        userModel.insert(user, function (results) {
            if (results) {
                req.session.success = 'Successfully sign up...Now you can login!!';
                res.redirect('/reservation');
            } else {
                req.session.success = 'Probelm with signup..try again'
                res.redirect('/reservation');
            }
        });
    } else {
        req.session.errors = error;
        res.redirect('/reservation');
    }


});








module.exports = router;