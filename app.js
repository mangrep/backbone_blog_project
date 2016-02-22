var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.get('/api/blogs', function(req, res) {
  Blog.find(function(err, docs) {
    docs.forEach(function(item) {
      console.log("Received a GET request for _id: " + item._id);
    });
    res.send(docs);
  });
});

app.post('/api/blogs', function(req, res) {
  console.log('Received a POST request:');
  for (var key in req.body) {
    console.log(key + ': ' + req.body[key]);
  }
  var blog = new Blog(req.body);
  blog.save(function(err, doc) {
    res.send(doc);
  });
});

app.delete('/api/blogs/:id', function(req, res) {
  console.log('Received a DELETE request for _id: ' + req.params.id);
  Blog.remove({_id: req.params.id}, function(err, doc) {
    res.send({_id: req.params.id});
  });
});

app.put('/api/blogs/:id', function(req, res) {
  console.log('Received an UPDATE request for _id: ' + req.params.id);
  Blog.update({_id: req.params.id}, req.body, function(err) {
    res.send({_id: req.params.id});
  });
});

module.exports = app;
var port = 4008;

app.listen(port);
console.log('server on ' + port);