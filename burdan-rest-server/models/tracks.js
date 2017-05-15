var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

var trackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  youtube: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  comments: [commentSchema]
}, {
  timestamps: true
});

var Track = mongoose.model('Track', trackSchema);

module.exports = Track;