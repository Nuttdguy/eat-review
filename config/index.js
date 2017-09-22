'use strict';

var express = require('express'),
    exphbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    reviews = require('../routes/reviews');
    // categories = require('./routes/categories'); // add route configurations
    // myConnection = require('express-myconnection') >> for connection string configuration

var app = express();


// setup template handlebars as template engine
app.engine('handlebars', exphbs( {defaultLayout: 'main'} ));
app.set('view engine', 'handlebars');

// setup the path location for static asset files
app.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function errorHandler(err, req, res) {
    res.status(500);
    res.render('error', { error: err });
}

// connect to mongoose
mongoose.connect('mongodb://localhost/eat-review');

// configure the port number
var portNumber = process.env.CRUD_PORT_NR || 3000;

// TODO ADD ROUTES AND CONFIGURE
// app.get('/categories', categories.show);
app.get('/', reviews.get);


// handle http server errors
app.use(errorHandler);

// start application up
app.listen(portNumber, function() {
   console.log('Create, Read, Update, and Delete (CRUD) server listenng on: ', portNumber);
});








