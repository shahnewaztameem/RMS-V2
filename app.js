var express = require('express');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var expressValidator = require('express-validator');
var signup = require('./controllers/signup');
var login = require('./controllers/login');
var logout = require('./controllers/logout');
var adminHome = require('./controllers/admin_home');
var managerHome = require('./controllers/manager_home');
var memberHome = require('./controllers/member_home');
var foodExperiance = require('./controllers/food_experience');
var menu = require('./controllers/menu');
var reservation = require('./controllers/reservation');
var pic = require('./controllers/pic');
var contact = require('./controllers/contact');
var about = require('./controllers/about');
var bcrypt = require("bcrypt");

var ejs = require('ejs');
var port = process.env.PORT || 3000;

//initialize express app
var app = express();

//configuration
app.set('view engine', 'ejs');

//middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressSession({
    secret: 'super secret',
    saveUninitialized: true,
    resave: false
}));
app.use(expressValidator());
app.use('/signup', signup);
app.use('/login', login);
app.use('/home-admin', adminHome);
app.use('/home-manager', managerHome);
app.use('/home-member', memberHome);
app.use('/logout', logout);
app.use('/food-experience', foodExperiance);
app.use('/menu', menu);
app.use('/reservation', reservation);
app.use('/pic', pic);
app.use('/contact', contact);
app.use('/about', about);
//route
app.get('/', (req, res) => {
    var err = {
        errors: req.session.errors,
        title: "Home"
    };
    req.session.errors = null;
    res.render('index', err);
});

//server startup
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})