var express = require('express');
var userModel = require.main.require('./model/user-model');
var router = express.Router();

//ROUTES
router.get("/", (req, res) => {
    userModel.getAllItemsName(result => {
      var data = {
        menu_info: result,
      };
      res.render("menu", data);
    });
  });

module.exports = router;