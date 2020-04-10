/*
*	Module dependencies
*/
var express     = 	   require('express');
const router = require('express').Router();
let Products = require('./routes/todoroute');
var http 	    = 	   require('http');
var https 	    = 	   require('https');
var path        =  	   require('path');
var bodyParser  =      require('body-parser');
var jsonParser  =      bodyParser.json();
var logger      =      require('morgan');
var mongoose    =      require('mongoose');
var database    =      require('./config/database'); 	// Get configuration file
var static      =      require( 'serve-static' );
var app         =      express();
var routes      =      require('./routes');
var session 	= 	   require('client-sessions');
var fs = require('fs');

var config = require('./config/config.json');
//Connection with Database
mongoose.connect(database.url);
var db = mongoose.connection;
//app.engine('jade',engine);
app.set('port', process.env.PORT || config.api_server_port);
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use( static( path.join( __dirname, 'public' )));
app.use(express.json());
app.use(express.logger('dev'));
app.use(express.multipart());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('secret'));
app.use(express.session());
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});




/*-----------------------All Routes List---------------------------------*/
var todoroute = require('./routes/todoroute');

/*---------------------------User Routes------------------------------*/
app.post('/addTodo',todoroute.addTodo);
app.get('/getproducts',todoroute.getproducts);
app.post('/removeProduct/:id',todoroute.removeProduct);


app.get('/',routes.apiview);

// var privateKey = fs.readFileSync('config/keys/key.pem', 'utf8');
// var certificate = fs.readFileSync('config/keys/server.crt', 'utf8');
// https.createServer({ key: privateKey, cert: certificate, requestCert: false,
//     rejectUnauthorized: false }, app).listen(app.get('port'), function () {
//     console.log('Express server listening on port ' + app.get('port'));
// });

// https.createServer(options, app).listen(app.get('port'), function(){
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

// router.route('/:id').delete((req, res) => {
//     todoroute.findByIdAndDelete(req.params.id)
//     .then(() =>res.json('Entry deleted.'))
//     .catch(err => res.status(400).json('error: '+ err));
// });
