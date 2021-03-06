
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var mongoose = require('mongoose');

// routes
var index = require('./routes/index');
var viewschedule = require('./routes/viewschedule');
var cancelapt = require('./routes/cancelapt');
var confirmCancel = require('./routes/confirmCancel');
var professorhome = require('./routes/professorhome');
var stu_homepage = require('./routes/stu_homepage');
var student_make_appt = require('./routes/student_make_appt');
var viewaltschedule = require('./routes/viewaltschedule');

// Example route
// var user = require('./routes/user');

// Connect to the Mongo database, whether locally or on Heroku
var local_database_name = 'HCIproj';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/viewschedule', viewschedule.view);
app.get('/viewaltschedule', viewaltschedule.view);
app.get('/cancelapt', cancelapt.view);
app.get('/confirmCancel', confirmCancel.view);
app.get('/professorhome', professorhome.view);
app.get('/stu_homepage', stu_homepage.view);
app.get('/student_make_appt', student_make_appt.view);
app.post('/stu_homepage/:id/drop', stu_homepage.dropApt);
app.post('/stu_homepage/:id/delete', stu_homepage.deleteApt);
app.post('/viewschedule', viewschedule.view);
app.post('/viewschedule/new', viewschedule.addAppointment);
app.post('/viewschedule/:id/join', viewschedule.joinAppointment);
app.post('/viewaltschedule', viewaltschedule.view);
app.post('/viewaltschedule/new', viewaltschedule.addAppointment);
app.post('/viewaltschedule/:id/join', viewaltschedule.joinAppointment);
app.post('/professorhome', professorhome.view);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
