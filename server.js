var express = require('express');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var timer = require('timers')

var os = require('os')


var port = 8000;

io.on('connection', (socket) => {
  console.log('Nueva conexión: ' + socket.id );

  socket.on('send-client', (data) => {
    console.log(data.msg);
  });

  socket.on('disconnect', () => {
    console.log('Cliente ' + socket.id + ' desconectado.')
  })

  // socket.emit('memory', { total: '123 MB' , enabled: '20 MB'})
  timer.setInterval( () => {
    let arch = os.arch()
    let cpus = os.cpus()
    let platform = os.platform() 
    let hostname = os.hostname() 
    let totalmem = os.totalmem() / 1048576
    let freemem = os.freemem() / 1048576
    let userInfo = os.userInfo()
    let usedmen = totalmem - freemem

    io.sockets.emit('memory', { arch , 
                                cpus , 
                                platform , 
                                hostname , 
                                totalmem , 
                                freemem , 
                                userInfo , 
                                usedmen })
  }, 1300 );

});

server.listen(port, () => {
  console.log("Socket escuchando: " + port);
});