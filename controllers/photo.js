const Photo = require('../models/Photo');

const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');

const catchAsync = require('../utils/catchAsync');

exports.checkPhoto = catchAsync(async (req, res, next) => {
  const photoId = req.params.photoId;
  const photo = await Photo.findById(photoId);
  if (!photo) {
    const error = new AppError('Photo not found!', 404);
    return next(error);
  }
  next();
});

exports.getPhotos = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Photo.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const photos = await features.query;

  const response = {
    status: 'success',
    count: photos.length,
    data: photos
  };

  res.status(200).json(response);
});

exports.getPhoto = catchAsync(async (req, res, next) => {
  const photoId = req.params.photoId;
  const photo = await Photo.findById(photoId);
  const response = {
    status: 'success',
    data: photo
  };

  res.status(200).json(response);
});

exports.postPhoto = catchAsync(async (req, res, next) => {
  const photoBody = req.body;
  const photo = await Photo.create(photoBody);
  const response = {
    status: 'success',
    data: photo
  };

  res.status(201).json(response);
});

exports.patchPhoto = catchAsync(async (req, res, next) => {
  const photoId = req.params.photoId;
  const photoBody = req.body;
  const photo = await Photo.findByIdAndUpdate(photoId, photoBody, {
    new: true,
    runValidators: true
  });
  const response = {
    status: 'success',
    data: photo
  };

  res.status(201).json(response);
});

exports.deletePhoto = catchAsync(async (req, res, next) => {
  const photoId = req.params.photoId;
  await Photo.findByIdAndDelete(photoId);
  const response = {
    status: 'success',
    data: null
  };

  res.status(200).json(response);
});
