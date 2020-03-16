var express = require('express');
var userModel = require.main.require('./model/user-model');
var router = express.Router();

router.get('/', (req, res) => {
    userModel.getAllFoodExperience((results) => {
        var data = {
            fx_info: results,
            u_type: req.session.u_type,
            u_name: req.session.user_name,
            u_id: req.session.user_id
        };

        res.render('food_experience/index', data);
    });
});

router.post('/', (req, res) => {
    var data = {
        u_id: req.session.user_id,
        u_name: req.session.user_name,
        f_about: req.body.f_about,
        r_loc: req.body.r_loc,
        f_exp: req.body.f_exp,

    };
    userModel.insertFoodExperience(data, (staus) => {
        res.redirect('/food-experience');
    });
});

//delete review
router.get('/delete/:id', (req, res) => {
    userModel.deleteFoodExperience(req.params.id, (status) => {
        res.redirect('/food-experience');
    });
});



module.exports = router;