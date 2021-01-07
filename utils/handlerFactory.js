const sharp = require('sharp');

const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const fileHelper = require('../utils/file');

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
    console.log(req.params);
    const model = await Model.findById(Object.values(req.params));
    console.log(model);
    if (!model) {
      const error = new AppError(`${Model.modelName} not found!`, 404);
      return next(error);
    }

    req.model = model;

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

exports.getOne = (Model, populateOpt) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(Object.values(req.params));
    if (req.params.userId) req.query = { fields: 'name, email' };
    if (populateOpt) {
      populateOpt.select = '-__v';
      query = query.populate(populateOpt);
    }

    const features = new APIFeatures(query, req.query).limitFields();

    const doc = await features.query;

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

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const reqParams = req.params;
    let reqBody = req.body;
    if (reqParams.hasOwnProperty('userId')) {
      if (!req.user) return next(new AppError('You are not logged in!', 401));

      const { password, confirmPassword } = reqBody;

      if (password || confirmPassword)
        return next(new AppError('This is not for password update!', 400));

      reqBody = filterObj(req.body, 'name', 'email', 'imageUrl');
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

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    if (req.params.hasOwnProperty('userId')) {
      await Model.findByIdAndUpdate(Object.values(req.params), {
        active: false
      });
    } else {
      await Model.findByIdAndDelete(Object.values(req.params));
      const imageUrl = req.model.imageUrl;
      if (imageUrl) fileHelper.deleteFile(imageUrl);
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

exports.processImage = (Model) =>
  catchAsync(async (req, res, next) => {
    const image = req.file;
    if (image) {
      let date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        time = date.getTime();

      if (month < 10) month = '0' + month;
      if (day < 10) day = '0' + day;

      date = [year, month, day, time].join('-');

      image.filename = `${date}-${req.user._id}.jpeg`;

      const filename = image.filename,
        imageUrl = `images/${Model.modelName.toLowerCase()}/${filename}`;

      req.body.imageUrl = imageUrl;

      const sharpFormat = sharp(image.buffer)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(imageUrl);

      await sharpFormat;
    }

    next();
  });

exports.checkImage = () =>
  catchAsync(async (req, res, next) => {
    const image = req.file,
      model = req.model;

    if (image && model.imageUrl) fileHelper.deleteFile(model.imageUrl);

    next();
  });
