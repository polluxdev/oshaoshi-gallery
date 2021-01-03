const User = require('../models/user');

const factory = require('../utils/handlerFactory');

exports.setUserId = (req, res, next) => {
  req.params.userId = req.user._id;
  next();
};

exports.checkUser = factory.checkModel(User, 'userId');

exports.getUsers = factory.getAll(User);

exports.getUser = factory.getOne(User, 'userId');

exports.postUser = factory.createOne(User);

exports.patchUser = factory.updateOne(User, 'userId');

exports.deleteUser = factory.deleteOne(User, 'userId');
