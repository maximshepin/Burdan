var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Tracks = require('../models/tracks');

var trackRouter = express.Router();
trackRouter.use(bodyParser.json());

trackRouter.route('/')
  // GET all tracks
  .get(function (req, res, next) {
    Tracks.find({}, function (err, track) {
      if (err) next(err);

      res.json(track);
    });
  })
  // POST a new track
  .post(function (req, res, next) {
    Tracks.create(req.body, function (err, track) {
      if (err) next(err);

      console.log('Track created!');
      var id = track._id;

      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end('Added the track with id: ' + id);
    });
  })
  // DELETE all tracks
  .delete(function (req, res, next) {
    Tracks.remove({}, function (err, resp) {
      if (err) next(err);

      res.json(resp);
    });
  });

trackRouter.route('/:trackId')
  // GET one dish
  .get(function (req, res, next) {
    Tracks.findById(req.params.trackId, function (err, track) {
      if (err) next(err);

      res.json(track);
    });
  })
  // PUT an updated track
  .put(function (req, res, next) {
    Tracks.findByIdAndUpdate(req.params.trackId, {
      $set: req.body
    }, {
      new: true
    }, function (err, track) {
      if (err) next(err);

      res.json(track);
    });
  })
  // DELETE a track
  .delete(function (req, res, next) {
    Tracks.findByIdAndRemove(req.params.trackId, function (err, resp) {
      if (err) next(err);

      res.json(resp);
    });
  });

trackRouter.route('/:trackId/comments')
  // GET all comments
  .get(function (req, res, next) {
    Tracks.findById(req.params.trackId, function (err, track) {
      if (err) next(err);

      res.json(track.comments);
    });
  })
  // POST one new comment
  .post(function (req, res, next) {
    Tracks.findById(req.params.trackId, function (err, track) {
      if (err) next(err);

      track.comments.push(req.body);
      track.save(function (err, track) {
        if (err) next(err);

        console.log('Updated Comments!');
        res.json(track);
      });
    });
  })
  // DELETE all comments
  .delete(function (req, res, next) {
    Tracks.findById(req.params.trackId, function (err, track) {
      if (err) next(err);

      for (var i = (track.comments.length - 1); i >= 0; i--) {
        track.comments.id(track.comments[i]._id).remove();
      }
      track.save(function (err, result) {
        if (err) next(err);

        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.end('Deleted all comments!');
      });
    });
  });

trackRouter.route('/:trackId/comments/:commentId')
  // GET one comment
  .get(function (req, res, next) {
    Tracks.findById(req.params.trackId, function (err, track) {
      if (err) next(err);

      res.json(track.comments.id(req.params.commentId));
    });
  })
  // PUT updated comment
  .put(function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    Tracks.findById(req.params.trackId, function (err, track) {
      if (err) next(err);

      track.comments.id(req.params.commentId).remove();
      track.comments.push(req.body);
      track.save(function (err, track) {
        if (err) next(err);

        console.log('Updated Comments!');
        res.json(track);
      });
    });
  })
  // DELETE one comment
  .delete(function (req, res, next) {
    Tracks.findById(req.params.trackId, function (err, track) {
      track.comments.id(req.params.commentId).remove();
      track.save(function (err, resp) {
        if (err) next(err);

        res.json(resp);
      });
    });
  });

module.exports = trackRouter;