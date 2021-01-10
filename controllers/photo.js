const Photo = require('../database/models/photo');

const factory = require('../utils/handlerFactory');
const upload = require('../utils/multer');

exports.setUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user._id;

  next();
};

exports.uploadImage = upload.single('image');

exports.processImage = factory.processImage(Photo);

exports.checkImage = factory.checkImage(Photo);

exports.checkPhoto = factory.checkModel(Photo);

exports.getPhotos = factory.getAll(Photo);

exports.getPhoto = factory.getOne(Photo, { path: 'reviews' });

exports.postPhoto = factory.createOne(Photo);

exports.patchPhoto = factory.updateOne(Photo);

exports.deletePhoto = factory.deleteOne(Photo);
