const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./models/User');
require('./models/Verify');
require('./models/Device');
require('./models/Data');

const config = require('./config');

/* Cai dat ket noi den mlab database bang mongoose */
const { username, password } = config.userConfig;

mongoose.connect(
  `mongodb://${username}:${password}@ds147451.mlab.com:47451/man-smart-agri`,
  { useMongoClient: true },
);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./controllers/userController')(app);
require('./controllers/deviceController')(app);

app.get('/', (req, res) => {
  res.render('index', { title: 'Smart Algae' });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
