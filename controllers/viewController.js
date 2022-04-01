const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
// const AppError = require('../utils/appError');
const User = require('../models/userModel');
exports.getOverview = catchAsync(async (req, res, next) => {
  //   1) get tour data
  const tours = await Tour.find();

  //  2)Build template
  //   ... done...
  //     3) render that

  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});

exports.getTourPage = catchAsync(async (req, res, next) => {
  //   const tour = await Tour.findOne()
  //     .where({ slug: req.params.name })
  //     .populate('guides');
  //   const reviews = await Review.find().where({ tour: tour._id });
  //   if (!tour) return next(new AppError('No such tour found', 404));
  const tour = await Tour.findOne({ slug: req.params.name }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  //   if (!tour) {
  //     res.status(404).render('errorTemplate', {
  //       title: 'Not Found'
  //     });
  //   }
  if (!tour) {
    return next(new AppError('No tour found.', 404));
  }
  res.status(200).render('tour', {
    title: `${tour.name} tour`,
    tour
  });
});
exports.getLoginPage = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Log into account'
  });
});
exports.getAccount = catchAsync(async (req, res) => {
  res.status(200).render('account', {
    title: 'Your Account'
  });
});
exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );
  res.status(200).render('account', {
    title: 'Your Account',
    user: updatedUser
  });
});
