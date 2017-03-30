var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var clients = 0;
var clickCount = 0;
users = {};


app.use(express.static(__dirname + '/node_modules'));

app.use(express.static(__dirname + '/css'));

app.get('/', function(req, res)
	{
		console.log("default GET");
		res.sendFile(__dirname + '/public/index.html');

	});


io.on('connection', function(client)
{
	console.log("client connected to socket");
	clients++;
	io.emit('hello', clients);

	client.on('sendMsg', function(msg) 
	{
		io.emit('msgSent', users[client.id], msg);
	});

	client.on('newUser', function(data)
	{
		io.emit('user', data);
		users[client.id] = data;
		console.log(users);
	});
});

server.listen(3000);