var express = require('express');

var app = express();

var path = require('path');

// body-parser not used in this simple app, using sockets instead, but included for completeness sake
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended:true}));

app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render('index');
})

var port = 8000;
var server = app.listen(port, function(){
	console.log('listening on port '+port);
})

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
	console.log('using sockets');
	console.log(socket.id);
	//all the socket code goes in here!
	socket.on('posting_form', function(data){
		console.log(data.form);
		socket.emit('server_response', {response: 'back from the server',
			name: data.name,
			id: Math.floor(Math.random()*100)
		});
	});
})