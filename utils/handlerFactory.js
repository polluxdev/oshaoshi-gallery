const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');

const catchAsync = require('./catchAsync');

const filterObj = (body, ...elements) => {
  const newObj = {};

  Object.keys(body).forEach((el) => {
    if (elements.includes(el)) newObj[el] = body[el];
  });

  return newObj;
};

exports.checkModel = (Model) =>
  catchAsync(async (req, res, next) => {
    const model = await Model.findById(Object.values(req.params));
    if (!model) {
      const error = new AppError(`${Model.modelName} not found!`, 404);
      return next(error);
    }

    next();
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const { photoId } = req.params;
    const filter = {};

    if (photoId) filter.photo = photoId;

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;

    const response = {
      status: 'success',
      count: doc.length,
      data: doc
    };

    res.status(200).json(response);
  });

exports.getOne = (Model, paramId, populateOpt) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(Object.values(req.params));
    if (populateOpt) query = query.populate(populateOpt);

    const doc = await query;

    const response = {
      status: 'success',
      data: doc
    };

    res.status(200).json(response);
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    const response = {
      status: 'success',
      data: doc
    };

    res.status(201).json(response);
  });

exports.updateOne = (Model, paramId) =>
  catchAsync(async (req, res, next) => {
    let reqBody = req.body;
    if (paramId === 'userId') {
      if (!req.user) return next(new AppError('You are not logged in!', 401));

      const { password, confirmPassword } = req.body;

      if (password || confirmPassword)
        return next(new AppError('This is not for password update!', 400));

      reqBody = filterObj(req.body, 'name', 'email');
    }
    const doc = await Model.findByIdAndUpdate(
      Object.values(req.params),
      reqBody,
      {
        new: true,
        runValidators: true
      }
    );
    const response = {
      status: 'success',
      data: doc
    };

    res.status(201).json(response);
  });

exports.deleteOne = (Model, paramId) =>
  catchAsync(async (req, res, next) => {
    if (paramId === 'userId') {
      await Model.findByIdAndUpdate(Object.values(req.params), {
        active: false
      });
    } else {
      await Model.findByIdAndDelete(Object.values(req.params));
    }

    const response = {
      status: 'success',
      data: null
    };

    res.status(200).json(response);
  });

exports.deleteAll = (Model) =>
  catchAsync(async (req, res, next) => {
    await Model.deleteMany({ photo: Object.values(req.params)[0] });

    const response = {
      status: 'success',
      data: null
    };

    res.status(200).json(response);
  });
