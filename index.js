//STEP2
let express = require('express');
let app = express();
app.use('/', express.static('public'));

//Initialize HTTP server
let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("Server listening at port: " + port);
});

//STEP 3: initialize socket.io
let io = require('socket.io').listen(server);

io.sockets.on('connection', (socket) => {
  console.log('A user with ' + socket.id + ' has joined!');
  //console.log(socket);

  //listen for different events

  //STEP6: receive data from clients
  socket.on('drawingData', (data) =>{
    console.log(data);

    //STEP7: send back data to all clients
    io.sockets.emit('draw', data);
  });

  //STEP 12: listen for color change
  socket.on('change', (data)=>{
    console.log(data);
    //STEP 13: tell all users except this one that color has changed

    //data to send
    let userId = socket.id;
    let r = data.red;
    let g = data.green;
    let b = data.blue;

    let obj = {
      "user": userId,
      "red": r,
      "green": g,
      "blue": b
    }

    socket.broadcast.emit('change', obj);
  });
});
