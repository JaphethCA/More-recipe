'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _api = require('./route/api');

var _api2 = _interopRequireDefault(_api);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config(); // library and controller initiazation


var app = (0, _express2.default)();

// secret for json web token
app.set('secret_key', process.env.SECRET_KEY);

// for parsing request body content
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

// more recipe api routes
app.use('/api', _api2.default);

app.get('/', function (req, res) {
  res.status(200).json({ message: 'Welcome to the more recipe app' });
});
app.all('*', function (req, res) {
  res.status(404).send('404: Not Found');
});

// server initialization
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Server running. listening on port:  ' + port);
});

exports.default = app;