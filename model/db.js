var mysql = require('mysql');

var config = {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'rms'
};


function getConnection(callback) {
    con = mysql.createConnection(config);
    con.connect(function (err) {
        if (err) {
            console.log('connection error: ' + err.stack);
        } else {
            console.log('connection id: ' + con.threadId);
        }
    });

    callback(con);
}


module.exports = {
    getResults: function (sql, data, callback) {
        getConnection(function (connection) {
            if (data.length == "") {

                connection.query(sql, function (err, results) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(results);
                    }
                });

            } else {

                connection.query(sql, data, function (err, results) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(results);
                    }
                });

            }

            connection.end(function (err) {
                console.log('connection ending ...');
            });
        });
    },

    execute: function (sql, data, callback) {
        getConnection(function (connection) {
            if (data.length == "") {

                connection.query(sql, function (err, status) {
                    if (err) {
                        callback(status);
                    } else {
                        callback(status);
                    }
                });
            } else {

                connection.query(sql, data, function (err, status) {
                    if (err) {
                        callback(status);
                    } else {
                        callback(status);
                    }
                });
            }
            connection.end(function (err) {
                console.log('connection ending ...');
            });
        });
    }
};