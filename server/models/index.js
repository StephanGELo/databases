var db = require('../db');

module.exports = {

  messages: {
    get: function (callback) {
      // fetch all messages
      //get id, text, roomname and username
      var queryStr = 'select messages.id, messages.text, messages.roomname, users.username from messages \
                      left outer join users on (messages.userId = users.id) \
                      order by messages.id desc'; // order by messages.id in descending order;
      db.query(queryStr, function(err, results) {
        callback(err, results);
      });

    }, // a function which produces all the messages
    
    post: function (params, callback) {
      //create a message
      var queryStr = 'insert into messages(text, userId, roomname) \
                      values (?, (select id from users where username = ? limit 1) ,?)';
      db.query(queryStr, params, function(err, results) {
        callback(err, results);
      });
    } // a function which can be used to insert a message into the database

  },

  users: {
    // Ditto as above.
    get: function (callback) {
      //fetch all users
      var queryStr = 'select * from users';
      db.query(queryStr, function(err, results) {
        callback(err, results);
      });

    },

    post: function (params, callback) {
      //create a user
      var queryStr = 'insert into users(username) values (?)';
      db.query(queryStr, params, function(err, results) {
        callback(err, results);
      });

    }
  }
};

