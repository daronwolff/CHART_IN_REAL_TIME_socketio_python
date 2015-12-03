var express = require('express');
var path = require('path');
var app = express();
var server = app.listen(3000);
app.use(express.static(path.join(__dirname, 'public')));
console.log("Corriendo en localhost:3000");
var io = require('socket.io').listen(server);
	io.sockets.on("connection",function(socket){
		// Al recibir datos del cliente, estos se emiten a datos_servidor
		socket.on("datos_cliente",function(data){
			console.log(data);
			io.emit("datos_servidor",data);
		});
	});	
 app.get('/', function(req, res) {
    res.sendFile(__dirname+'/index.html')
})
