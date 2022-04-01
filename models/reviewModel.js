const mongoose = require('mongoose');
const Tour = require('../models/tourModel');
// const slugify = require('slugify');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'review cannot be empty']
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 1,
      max: 5
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'review cannot be anonimus (add tour)']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'review cannot be anonimus (add user)']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

reviewSchema.index(
  {
    tour: 1,
    user: 1
  },
  {
    unique: true
  }
);

// --------Middleware-------- //
reviewSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name photo -_id'
  });
  //   .populate({
  //     path: 'tour',
  //     select: 'name'
  //   });
  next();
});
reviewSchema.pre(/^findOneAnd/, async function(next) {
  this.rev = await this.findOne();
  // console.log(rev);
  next();
});
reviewSchema.post(/^findOneAnd/, async function() {
  await this.rev.constructor.calcAverageRatings(this.rev.tour);
});

// TODO: add midleware to merge multiple entries
reviewSchema.post('save', function() {
  this.constructor.calcAverageRatings(this.tour);
});
reviewSchema.statics.calcAverageRatings = async function(tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId }
    },
    {
      $group: {
        _id: '$tour',
        nRatings: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);
  console.log(stats);
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRatings,
      ratingsAverage: stats[0].avgRating
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5
    });
  }
};

// --------Export-------- //
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
