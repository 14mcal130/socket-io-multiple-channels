var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, {
    'pingInterval': 2000,
    'pingTimeout': 5000
});

io.on('connection', function (socket) {
    //new user 
    socket.on('user1', function (data, callback) {
    });

    socket.on('user2', function (data, callback) {
    });
    // send message 
    socket.on('send message', function (data) {
        io.sockets.emit('new message', { msg: data, nick: socket.nickname });
    });
    //disconnected service
    socket.on('disconnect', function (data) {
        if (!socket.nickname) return;

    });
});
http.listen(8089, function () {
    console.log('listening on *:8089');
});


setInterval(() => {
    io.sockets.emit('user1', 'hi user1 ' + new Date());
    io.sockets.emit('user2', 'hi user 2 ' + new Date());
}, 1000);
