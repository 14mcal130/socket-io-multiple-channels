# socket-io-multiple-channels
socket io multiple channels
1) server.js
2) Client_1.html
3) Client_2.html

server.js
---------

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


Client_1.html
-------------
<div id="data"></div>
<script src="https://cdn.socket.io/socket.io-1.0.0.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.5/socket.io.min.js"></script>
<script type="text/javascript">
    var name = "";
    var socket = io('http://localhost:8089');
    $(document).ready(function () {
        name = getCookie("Client");

        if (name == null || name == "null") {
            return false;
        }
        // socket = io.connect();
        socket.emit('user2', name, function (data) {

        });
    });
    socket.on('user2', function (data) {
        $("#data").html(data);

    });

    function getCookie(name) {
        var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    }
    function setCookie(name, value, days) {
        var d = new Date;
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
        document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
    }

</script>


cleint-2
-----------
<div id="data"></div>
<script src="https://cdn.socket.io/socket.io-1.0.0.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.5/socket.io.min.js"></script>
<script type="text/javascript">
    var name = "";
    var socket = io('http://localhost:8089');
    $(document).ready(function () {
        name = getCookie("Client");

        if (name == null || name == "null") {
            return false;
        }
        // socket = io.connect();
        socket.emit('user1', name, function (data) {
           
        });
    });
    socket.on('user1', function (data) {
       $("#data").html(data);

    });

    function getCookie(name) {
        var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    }
    function setCookie(name, value, days) {
        var d = new Date;
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
        document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
    }

</script>

