var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Favorites = require('../models/favorites');
var Verify = require('./verify');

var favoritesRouter = express.Router();

favoritesRouter.use(bodyParser.json());

favoritesRouter.route('/')
  .get(Verify.verifyOrdinaryUser, function (req, res, next) {

    if (!req.decoded._id) throw new Error('user not found');

    Favorites.findOne({
        'user': req.decoded._id
      })
      .populate('user')
      .populate('dishes')
      .exec(function (err, favorite) {
        if (err) throw err;
        res.json(favorite);
      });
  })

  .post(Verify.verifyOrdinaryUser, function (req, res, next) {

    if (!req.body._id) throw new Error('_id is null');
    if (!req.decoded._id) throw new Error('user not found');

    Favorites.findOne({
      'user': req.decoded._id
    }, function (err, favorites) {
      if (favorites == null) {
        Favorites.create({
            user: req.decoded._id,
            dishes: [req.body._id]
          },
          function (err, favorite) {
            res.json(favorite);
          }
        );
      } else {
        var dishExists = false;
        for (var i in favorites.dishes) {
          if (favorites.dishes[i] == req.body._id) {
            dishExists = true;
          }
        }

        if (!dishExists) {
          favorites.dishes.push(req.body._id);
          favorites.save(function (err) {
            if (err) throw err;
            // saved!
          });
        }
        res.json(favorites);
      }
    });
  })

  .delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.remove({}, function (err, resp) {
      if (err) throw err;
      res.json(resp);
    });
  });

favoritesRouter.route('/:favoritesId')

  .delete(Verify.verifyOrdinaryUser, function (req, res, next) {

    if (!req.params.favoritesId) throw new Error('_id is null');
    if (!req.decoded._id) throw new Error('user not found');

    Favorites.findOne({
      'user': req.decoded._id
    }, function (err, favorites) {
      if (favorites == null) {

        throw new Error('user has no favorites');

      } else {

        var dishExists = false;
        for (var i in favorites.dishes) {

          if (favorites.dishes[i] == req.params.favoritesId) {
            favorites.dishes.splice(i, 1);
            break;
          }
        }

        favorites.save(function (err) {
          if (err) throw err;
          // saved!
        });

        res.json(favorites);
      }
    });

  });

module.exports = favoritesRouter;
