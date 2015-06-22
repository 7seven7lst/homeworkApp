var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();
var port =  3006;

//set dirname to client folder to serve static assets (index.html)
app.use('/', express.static(__dirname + '/client'));

//parses all incoming data from strings to JSON
app.use(bodyParser.json());

app.use(express.static(__dirname + '/client'));

app.get('/home', function (req, res) {
  res.end('home');
});


app.get('/detail', function (req, res) {
  res.end('detail');
});
app.get('*/', function(req, res) {
  res.redirect('/home');
})

app.listen(port, function() {
  console.log("Listening on port " + port + "...");
});
