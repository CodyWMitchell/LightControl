var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
   res.sendfile('index.html');
});

io.on('connection', function(socket) {
    console.log("a user connected");

    socket.on('message',(msg) => {
        console.log("sending message");
        color=msg;
        io.emit('message',msg);
    });
});

//lights

var color = "255000255";

http.listen(3000, function() {
   console.log('listening on localhost:3000');
});

// serial port initialization:
var SerialPort = require('serialport'); // include the serialport library
var portName = "COM3"; // get the port name from the command line
var myPort = new SerialPort(portName, 9600);// open the port
 
// these are the definitions for the serial events:
myPort.on('open', openPort); // called when the serial port opens

function openPort() {
    console.log('port open');
 
    // since you only send data when the port is open, this function
    // is local to the openPort() function:
    function sendData() {
         // convert the value to an ASCII string before sending it:
         myPort.write(color.toString());
    }
    // set an interval to update the brightness 2 times per second:
    setInterval(sendData, 2000);
}