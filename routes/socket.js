// class users
var users = (function () {
  var names = {};
  
  // does username allready exists
  var claim = function (name) {
    if (!name || names[name]) {
      return false;
    } else {
      names[name] = true;
      return true;
    }
  };

  // find the lowest unused guest 
  var getGuestName = function () {
    var name
      nextUserId = 1;

    do {
      name = 'Schneke #' + nextUserId;
      nextUserId += 1;
    } while (!claim(name));

    return name;
  };

  // users list
  var get = function () {
    var res = [];
    for (user in names) {
      res.push(user);
    }

    return res;
  };

  // delete
  var free = function (name) {
    if (names[name]) {
      delete names[name];
    }
  };

  return {
    free: free,
    get: get,
    getGuestName: getGuestName
  };
}());

var lobbys = (function () {
  var names = [];

   // lobbys list
  var get = function () {
    return names;
  };

  // add lobby to list
  var getNewList = function (name)
  {
     names.push(name);
     return names;
  };

  return {
    get: get,
    getNewList: getNewList
  };

}());

// export function for listening to the socket
module.exports = function (socket) {
  var name = users.getGuestName();
  
  socket.on('connection', function(client){
    client.on('message', function(err, msg){
        client.broadcast.emit('message', msg);
    });
 });


  socket.on('refresh',function() {
    socket.emit('init', {
      name: name,
      users: users.get(),
      lobbys: lobbys.get()
    });
  });

  // send the new user their name and a list of users
  socket.emit('init', {
    name: name,
    users: users.get(),
    lobbys: lobbys.get()
  });

  // notify other clients that a new user has joined
  socket.broadcast.emit('user:join', {
    name: name
  });

  // broadcast a user's lobby to other users + list of lobys
  socket.on('send:lobby', function (data) {
     socket.broadcast.emit('send:lobby', {
   //   user: name,
     titre: data.lobby,
     lobbys: lobbys.getNewList(data.lobby)

     });

  });

  socket.on('send:login', function (data) {
    console.log("socket : login user "+data.login)
     socket.emit('send:login', {
   //   user: name,
      login : data.login,
      password : data.password,
     });

  });

  // clean up when a user leaves, and broadcast it to other users
  socket.on('disconnect', function () {
    socket.broadcast.emit('user:left', {
      name: name
    });
    users.free(name);
  });
};
