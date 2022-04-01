const Review = require('../models/reviewModel');
// const APIFeatures = require('../utils/apiFeatures');
// const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

// Middleware
exports.setTourUserIds = (req, res, next) => {
  let reviewArray;
  if (Array.isArray(req.body)) {
    reviewArray = req.body;
  } else {
    reviewArray = Array.from([req.body]);
  }
  reviewArray.forEach(review => {
    if (!review.tour) review.tour = req.params.tourId;
    if (!review.user) review.user = req.user.id;
  });
  next();
};
// Controller
exports.getAllReviews = factory.getAll(Review);

exports.createReview = factory.createOne(Review); //Crud
exports.getReview = factory.getOne(Review); //Read cRud
exports.updateReview = factory.updateOne(Review); //crUd
exports.deleteReview = factory.deleteOne(Review); //cruD
