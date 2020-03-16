var db = require('./db');

module.exports = {
    /* validate: function (user, callback) {
         var sql = "select * from users_info where user_email=? and user_password =?";
         db.getResults(sql, [user.user_email, user.user_pass], function (result) {
             if (result.length > 0) {
                 callback(result[0]);
             } else {
                 callback([]);
             }
         })
     },*/
    validate: function (user, callback) {
        var sql = "select * from users_info where user_email=? ";
        db.getResults(sql, [user.user_email], function (result) {
            if (result.length > 0) {
                callback(result[0]);
            } else {
                callback([]);
            }
        })
    },
    insert: function (user, callback) {
        var sql = "INSERT into users_info values(null,?,?,?,?,?,?,?)";
        db.execute(sql, [
            user.username,
            user.user_firstname,
            user.user_lastname,
            user.user_email,
            user.user_type,
            user.user_password,
            user.user_gender
        ], function (success) {
            callback(success);
        });
    },
    get: function (userId, callback) {
        var sql = "select * from users_info where id= ?";
        db.getResults(sql, [userId], function (result) {
            if (result.length > 0) {
                callback(result[0]);
            } else {
                callback([]);
            }
        });
    },
    getAll: function (callback) {
        var sql = "select * from users_info";
        db.getResults(sql, [], function (results) {
            callback(results);
        });
    },
    delete: function (id, callback) {
        var sql = "delete from users_info where id=?";
        db.execute(sql, [id], function (status) {
            if (status) {
                callback(true);
            } else {
                callback(false);
            }
        });
    },
    update: function (user, callback) {
        var sql = "UPDATE users_info SET user_firstname=? , user_lastname=? , user_email=? , user_password=? ,user_gender=? where id=?";
        db.execute(sql, [
            user.user_firstname,
            user.user_lastname,
            user.user_email,
            user.user_password,
            user.user_gender,
            user.user_id
        ], function (status) {
            if (status) {
                callback(true);
            } else {
                callback(false);
            }
        });
    },
    IndividualUserUpdate: function (user, callback) {
        var sql = "UPDATE users_info SET user_type=?  where id=?";
        db.execute(sql, [
            user.user_type,
            user.user_id
        ], function (status) {
            if (status) {
                callback(true);
            } else {
                callback(false);
            }
        });
    },
    insertIntoRestaurant: function (data, callback) {
        var sql = "insert into restaurant_info values(null,?,?,?)";
        db.execute(sql, [
            data.r_name,
            data.r_loc,
            data.r_details,
        ], function (status) {
            if (status) {
                callback(true);
            } else {
                callback(false);
            }
        });
    },
    getRestaurant: function (data, callback) {
        var sql = "select r_id from restaurant_info where r_name=? and r_location=?";
        db.getResults(sql, [data.r_name, data.r_loc], function (result) {
            callback(result[0]);
        });

    },

    insertIntoRestaurantItem: function (data, callback) {
        var sql = "insert into item_details values(null,?,?,?),(null,?,?,?)";
        db.execute(sql, [
            data.id, data.item1, data.item1_d,
            data.id, data.item2, data.item2_d
        ], function (status) {
            if (status) {
                callback(true);
            } else {
                callback(false);
            }
        });
    },
    getAllRestaurant: function (callback) {
        var sql = "select * from restaurant_info";
        db.getResults(sql, [], function (results) {
            callback(results);
        });

    },
    addItem: function (data, callback) {
        var sql = "insert into item_details values(null,?,?,?)";
        db.execute(sql, [data.r_id, data.i_name, data.i_detail], function (status) {
            callback(status);
        });
    },
    getRestaurantInfo: function (id, callback) {
        var sql = "select * from restaurant_info where r_id=?";
        db.getResults(sql, [id], (result) => {
            callback(result[0]);
        });
    },
    getAllItems: function (id, callback) {
        var sql = "select * from item_details where r_id=?";
        db.getResults(sql, [id], (results) => {
            callback(results);
        });
    },
    updateRestaurant: function (data, callback) {
        var sql = "update restaurant_info set r_name=?, r_location=?, r_details=? where r_id=?";
        db.execute(sql, [data.r_name,
            data.r_location,
            data.r_details,
            data.id
        ], function (status) {
            callback(status);
        });
    },
    deleteItem: function (id, callback) {
        var sql = "delete from item_details where i_id=?";
        db.execute(sql, [id], function (status) {
            if (status) {
                callback(true);
            } else {
                callback(false);
            }
        });
    },
    updateItem: function (data, callback) {
        var sql = "update item_details set i_name=?, i_detail=? where i_id=?";
        db.execute(sql, [data.i_name, data.i_detail, data.id], function (status) {
            callback(status);
        });
    },
    deleteRestaurants: function (id, callback) {
        var sql = "delete from restaurant_info where r_id=?";
        db.execute(sql, [id], function (status) {
            if (status) {
                var sql = "delete from item_details where r_id=?";
                db.execute(sql, [id], function (status) {
                    callback(true);
                });
            }
        });
    },
    getRestaurantByLocation: function (location, callback) {
        var sql = "select * from restaurant_info LEFT JOIN item_details on restaurant_info.r_id = item_details.r_id";
        db.getResults(sql, [location], (result) => {
            callback(result);
        });
    },
    getAllFoodExperience: function (callback) {
        var sql = "select * from food_experience";
        db.getResults(sql, [], function (results) {
            callback(results);
        });
    },
    insertFoodExperience: function (data, callback) {
        var sql = "insert into food_experience values(null,?,?,?,?,?)";
        db.execute(sql, [
            data.u_id,
            data.u_name,
            data.f_about,
            data.r_loc,
            data.f_exp
        ], function (status) {
            if (status) {
                callback(true);
            } else {
                callback(false);
            }
        });
    },
    deleteFoodExperience: function (id, callback) {
        var sql = "delete from food_experience where f_id=?";
        db.execute(sql, [id], function (status) {
            if (status) {
                callback(true);
            } else {
                callback(false);
            }
        });
    },
    insertIntoForm: function (user, callback) {
        var sql = "INSERT into contact_form values(null,?,?)";
        db.execute(sql, [
            user.user_email,
            user.user_message,
        ], function (success) {
            callback(success);
        });
    },
    getAllFromContact: function (userId, callback) {
        var sql = "select * from contact_form";
        db.getResults(sql, [], function (result) {
            callback(result);
        });
    },
    deleteMessage: function (id, callback) {
        var sql = "delete from contact_form where id=?";
        db.execute(sql, [id], function (status) {
            if (status) {
                callback(true);
            } else {
                callback(false);
            }
        });
    },





    getAllPic: function (callback) {
        var sql = "select * from pic";
        db.getResults(sql, [], function (results) {
            callback(results);
        });
    },






    insertPic: function (data, callback) {
        var sql = "insert into pic values(?,?,?,?)";
        db.execute(sql, ["",
            data.u_id,

            data.username,
            data.filename



        ], function (status) {
            if (status) {
                callback(true);
            } else {
                callback(false);
            }
        });
    },





    deletePic: function (id, callback) {
        var sql = "delete from pic where p_id=?";
        db.execute(sql, [id], function (status) {
            if (status) {
                callback(true);
            } else {
                callback(false);
            }
        });
    },


    getAllReservation: function (userId, callback) {
        var sql = "select * from reservation_details";
        db.getResults(sql, [], function (result) {
            callback(result);
        });
    },
    getReservation: function (userId, callback) {
        var sql = "select * from reservation_details where id= ?";
        db.getResults(sql, [userId], function (result) {
            if (result.length > 0) {
                callback(result[0]);
            } else {
                callback([]);
            }
        });
    },
    ReservationUpdate: function (user, callback) {
        var sql = "UPDATE reservation_details SET phone_no =?, total_guest=?, status=?  where id=?";
        db.execute(sql, [
            user.phone_no,
            user.total_guest,
            user.reservation_status,
            user.id
        ], function (status) {
            if (status) {
                callback(true);
            } else {
                callback(false);
            }
        });
    },
    deleteReservation: function (id, callback) {
        var sql = "delete from reservation_details where id=?";
        db.execute(sql, [id], function (status) {
            if (status) {
                callback(true);
            } else {
                callback(false);
            }
        });
    },
    getAllItemsName: function (callback) {
        var sql = "select * from item_details";
        db.getResults(sql, [], function (results) {
            callback(results);
        });
    }
}