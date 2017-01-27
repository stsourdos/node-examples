var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Leadership = require('../models/leadership');
var Verify = require('./verify');

var leadershipRouter = express.Router();

leadershipRouter.use(bodyParser.json());

leadershipRouter.route('/')
  .get(function (req, res, next) {
    Leadership.find({}, function (err, leadership) {
      if (err) throw err;
      res.json(leadership);
    });
  })

  .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Leadership.create(req.body, function (err, leadership) {
      if (err) throw err;
      console.log('leadership created!');
      var id = leadership._id;

      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end('Added the leadership with id: ' + id);
    });
  })

  .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Leadership.remove({}, function (err, resp) {
      if (err) throw err;
      res.json(resp);
    });
  });

leadershipRouter.route('/:leadershipId')
  .get(function (req, res, next) {
    Leadership.findById(req.params.leadershipId, function (err, leadership) {
      if (err) throw err;
      res.json(leadership);
    });
  })

  .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Leadership.findByIdAndUpdate(req.params.leadershipId, {
      $set: req.body
    }, {
      new: true
    }, function (err, leadership) {
      if (err) throw err;
      res.json(leadership);
    });
  })

  .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Leadership.findByIdAndRemove(req.params.leadershipId, function (err, resp) {
      if (err) throw err;
      res.json(resp);
    });
  });

module.exports = leadershipRouter;
