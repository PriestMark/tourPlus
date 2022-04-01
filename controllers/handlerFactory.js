const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No doc found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError('No doc found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        doc
      }
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const newdoc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        doc: newdoc
      }
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions)
      Model.findById(req.params.id).populate(populateOptions);
    doc = await query;
    // Tour.findOne({ _id: req.params.id })

    if (!doc) {
      return next(new AppError('No doc found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        doc
      }
    });
  });

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    // TODO: this is only for reviews now, rework/refactor to common approach
    let filter = {};
    if (req.params.tourId) filter = { toue: req.params.tourId };

    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query.explain();

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        doc
      }
    });
  });
