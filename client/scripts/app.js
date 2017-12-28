// YOUR CODE HERE:
var app = {
  server: "http://parse.sfs.hackreactor.com/chatterbox/classes/messages",
  username: 'anonymous',
  roomname: 'lobby',
  messages: [],
  lastMessageId: 0,

  init: function() {
    //Get Username
    app.username = window.location.search;

    //cache jQuery selectors
    app.$send = $('#send');
    app.$message = $('#message');
    app.$chats = $('#chats');
    app.$roomSelect = $('#roomSelect');
    
    //add listeners
    app.$send.on('submit', app.handleSubmit);
    app.$roomSelect.on('change', app.handleRoomChange);

    // fetch previous messages automatically
    app.fetch();

    //poll for new messages
    // setInterval(function (){
    //   app.fetch();
    // }, 3000);
  },

  fetch: function() {
    $.ajax({
      url: app.server,
      type: 'GET',
      data: { order: '-createdAt' },
      contentType: 'application/json',
      success: function(data) {
        // Don't do anything if we have nothing to work with
        if(!data.results || data.results.length === 0) {
          return;
        }
        // store messages locally for caching later
        app.messages = data.results;
        
        var newMessage = app.messages[app.messages.length-1];
       
        // only bother updating the DOM if we have a new message
        if(newMessage.objectId !== app.lastMessageId) {
          app.renderRoomList(app.messages);
          app.renderMessages(app.messages);
        }
        console.log('data was fetched successfully!', data);
      },
      error: function(){
        console.log('Try again. Request unsuccessful!');
      }
    })
  },

  handleSubmit: function(event) {
    //POST a message to the server
  var message = {
      username: app.$username,
      text: app.$message.val(),
      roomname: app.roomname || 'lobby' // not yet implemented app.$roomname
    };

    app.send(message);
    console.log('inside handleSubmit');
    event.preventDefault();
  },

  send: function(message){
  
    $.ajax({
      url: app.server,
      type: 'POST',
      data: message,
      success: function(data){
        //clear the messages input
        app.$message.val('');

        //success. Trigger a fetch to update the messages
        app.fetch();
      },
      error: function(error) {
        // fail. Show an error in the console
        console.error('Failed to send message', error);
      }
    });
  },


  renderMessages: function(messages) {
    //clear old messages
    app.clearMessages();
    // render each individual messages;
    messages.forEach(app.renderMessage);
  },
 
  clearMessages: function() {
    app.$chats.html(''); // we clear the chat component
  },

  renderMessage: function(message){

      //create a div to hold the message
      var $chat = $('<div class="chat"/>');
      
      //Add in the message data
      var $username = $('<span class="username"/>');
      $username.text(message.username + ': ').appendTo($chat);
      
      // add the message to the UI
      var $message =$('<br><span/>');
      $message.text(message.text).appendTo($chat);
      app.$chats.append($chat);
    
  },

  // escapeXSS: function(string) {
  //   if (!string) { return; }
  //   return string.replace(/[&<>"'=\/]/g, '');
  // }
  renderRoomList: function (messages) {
    app.$roomSelect.html('<select><option value="_newRoom">New room</option></select>');
    if(messages) {
      var rooms = {}; // constant time look up for keys
      messages.forEach(function(message) {
        var roomname = message.roomname;
        if(roomname && !rooms[roomname]) {
          app.renderRoom(roomname);

          // store that we've added this room already
          rooms[roomname] = true;
        }
      }); 
    }
    app.$roomSelect.val(app.roomname);
  },

  renderRoom: function(roomname) {
    // prevent cross-site scripting by escaping with DOm methods
    var $option = $('<option/>').val(roomname).text(roomname); // explain what is this line doing here?

   // Add to select
   app.$roomSelect.append($option);
  },

  handleRoomChange: function () {
    console.log('Inside handleRoomChange');
  }

};
