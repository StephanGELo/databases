var models = require('../models');

module.exports = {
  
  messages: {

    // a function which handles a get request for all messages
    get: function (req, res) {
      models.messages.get(function(err, results) {
        if (err) {
          console.log(err);
        }
        res.json(results);
      });

    }, 

    // a function which handles posting a message to the database
    post: function (req, res) {
      var params = [req.body.message, req.body.username, req.body.roomname];
      models.messages.post(params, function(err, results) {
        if (err) {
          console.log(err);
        }
        res.sendStatus(201);
      });
    } 
  },

  // Ditto as above
  users: {
    get: function (req, res) {
      models.users.get(function(err, results) {
        if (err) {
          console.log(err);
        }
        res.json(results);
      });

    },
    post: function (req, res) {
      var params = [req.body.username];
      models.users.post(params, function(err, results) {
        if (err) {
          console.log(err);
        }
        res.sendStatus(201);
      });
    }
  }
};

