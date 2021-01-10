const User = require('../database/models/user');

const factory = require('../utils/handlerFactory');
const upload = require('../utils/multer');

exports.setUserId = (req, res, next) => {
  req.params.userId = req.user._id;

  next();
};

exports.uploadImage = upload.single('image');

exports.processImage = factory.processImage(User);

exports.checkImage = factory.checkImage(User);

exports.checkUser = factory.checkModel(User);

exports.getUsers = factory.getAll(User);

exports.getUser = factory.getOne(User);

exports.postUser = factory.createOne(User);

exports.patchUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);
