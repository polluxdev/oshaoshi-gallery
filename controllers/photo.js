const Photo = require('../models/photo');

const factory = require('../utils/handlerFactory');

exports.setUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

exports.checkPhoto = factory.checkModel(Photo, 'photoId');

exports.getPhotos = factory.getAll(Photo);

exports.getPhoto = factory.getOne(Photo, 'photoId', { path: 'reviews' });

exports.postPhoto = factory.createOne(Photo);

exports.patchPhoto = factory.updateOne(Photo, 'photoId');

exports.deletePhoto = factory.deleteOne(Photo, 'photoId');
