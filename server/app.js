const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const serveIndex = require('serve-index');

module.exports = app;

// logging middleware
app.use(morgan('dev'));
app.use(cors());

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ftp for sharing the chrome extension

// auth and api routes
app.use('/auth', require('./auth'));
app.use('/api', require('./api'));

app.use('/google', require('./google'));
app.use('/callback', require('./callback'));
app.use('/spotifyconnect', require('./spotifyconnect'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
);

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});
