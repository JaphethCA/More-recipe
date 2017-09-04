'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRecipes = exports.signup = exports.signin = undefined;

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _app = require('../app');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Users = _models2.default.Users;
var Recipes = _models2.default.Recipes;
var Favorites = _models2.default.Favorites;
// export default class UserController 


var signup = function signup(req, res) {
  var userEmail = req.body.email;
  var userPassword = req.body.password;
  var userName = req.body.username;
  var userFirstname = req.body.firstname;
  var userLastname = req.body.lastname;
  var aboutme = req.body.aboutme;

  if (!Boolean(userEmail) && !Boolean(userPassword) && !Boolean(userName) && !Boolean(userFirstname) && !Boolean(userLastname) && !Boolean(aboutMe)) {
    return res.status(406).json({ message: 'fields cannot be empty' });
  }
  var alreadyUsers = Users.findAll({
    where: {
      email: userEmail,
      password: userPassword
    }
  }).then(function (users) {
    if (users) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = users[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var user = _step.value;

          if (user.get('email') === userEmail) {
            return res.json({ message: "User already exists! Try signing in with email and password" });
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  });

  return Users.create({
    firstName: userFirstname,
    lastName: userLastname,
    userName: userName,
    password: userPassword,
    aboutMe: aboutme,
    email: userEmail
  }).then(function (user) {
    return res.status(200).json({ message: 'Account Successfully created! You can now sign in with your email and password' });
  }).catch(function (err) {
    return res.status(500).json(err);
  });
};

// proceses user sign in 
var signin = function signin(req, res) {
  var emails = req.body.email;
  var passwords = req.body.password;
  if (!Boolean(emails) && !Boolean(passwords)) {
    return res.status(406).json({ message: 'Email or Password Should not be empty' });
  }
  return Users.findOne({
    where: {
      email: emails,
      password: passwords
    }
  }).then(function (user) {
    if (Boolean(user.email)) {
      req.session.email = req.body.email;
      req.session.userId = user.get('id');

      // let token = jwt.sign(user, app.get('secret_key'), {expiresInMinutes: 1440});
      res.status(200).json({ username: user.userName, message: "Login Sucessful!" });
    } else {
      res.status(406).send('Invalid Username or Password');
    }
  }).catch(function (err) {
    res.status(400).json({ Error: err });
  });
};

//returns all recipes that is added by a particular user
var userRecipes = function userRecipes(req, res) {

  var userId = parseInt(req.params.userId);

  return Recipes.findAll({
    where: {
      usersId: userId
    }
  }).then(function (recipes) {
    res.status(201).json(recipes);
  }).catch(function (err) {
    res.send(500);
  });
};

exports.signin = signin;
exports.signup = signup;
exports.userRecipes = userRecipes;