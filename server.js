const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
var mongoose = require('mongoose');
var path = require('path');



var DataRoutes = require('./api/dataRoute');

// initilaizing express
const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));




// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/rest', {
  useMongoClient: true,
}).then(function(db){
	console.log(`Connected successfully to ${db.name} database`);
});



app.use('/data',DataRoutes);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});



const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));






















