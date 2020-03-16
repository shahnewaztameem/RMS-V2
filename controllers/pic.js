var express = require('express');
var userModel = require.main.require('./model/user-model');
var router = express.Router();


var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+'-'+file.originalname);
    }
});

var upload = multer({ storage });





router.get('*', function (req, res, next) {
    if (req.session.user_id != null) {
        next();
    } else {
        res.redirect('/login');
    }
});

//get

router.get('/', (req, res) => {
    userModel.getAllPic((results) => {
        var data = {
            fx_info: results,
            u_type: req.session.u_type,
            username: req.session.user_name,
            user_email: req.session.user_email,
            u_id:req.session.user_id,

            staus:req.session.staus,
        };
        res.render('pic', data);
    });
});

//post
router.post('/', upload.single('img'), function(req, res, next){


    var filename1 = req.file.filename;

    var data = {
        
        
        u_id:req.session.user_id,
        username: req.session.user_name,
        filename: filename1
        
        

        
    };
    userModel.insertPic(data, (staus) => {
        res.redirect('/pic');
    });
});

//delete reservation
router.get('/delete/:id', (req, res) => {
    userModel.deletePic(req.params.id, (status) => {
        res.redirect('/pic');
    });
});




module.exports = router;
