var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('../models/user');
var Verify = require('./verify');

var userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.route('/')
  .get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    User.find({}, function (err, user) {
      if (err) throw err;
      res.json(user);
    });
  })

  ;

module.exports = userRouter;
