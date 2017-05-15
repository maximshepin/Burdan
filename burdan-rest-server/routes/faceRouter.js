var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Faces = require('../models/faces');

var faceRouter = express.Router();
faceRouter.use(bodyParser.json());

faceRouter.route('/')
  .get(function (req, res, next) {
    Faces.find({}, function (err, face) {
      if (err) next(err);

      res.json(face);
    });
  })
  .post(function (req, res, next) {
    Faces.create(req.body, function (err, face) {
      if (err) next(err);

      console.log('Face created!');
      var id = face._id;

      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end('Added the face with id: ' + id);
    });
  })
  .delete(function (req, res, next) {
    Faces.remove({}, function (err, resp) {
      if (err) next(err);

      res.json(resp);
    });
  });

faceRouter.route('/:faceId')
  .get(function (req, res, next) {
    Faces.findById(req.params.faceId, function (err, face) {
      if (err) next(err);

      res.json(face);
    });
  })
  .put(function (req, res, next) {
    Faces.findByIdAndUpdate(req.params.faceId, {
      $set: req.body
    }, {
      new: true
    }, function (err, face) {
      if (err) next(err);

      res.json(face);
    });
  })
  .delete(function (req, res, next) {
    Faces.findByIdAndRemove(req.params.faceId, function (err, resp) {
      if (err) next(err);

      res.json(resp);
    });
  });

module.exports = faceRouter;