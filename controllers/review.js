const Review = require('../models/review');

const factory = require('../utils/handlerFactory');

exports.setPhotoUserId = (req, res, next) => {
  if (!req.body.photo) req.body.photo = req.params.photoId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

exports.checkReview = factory.checkModel(Review);

exports.getReviews = factory.getAll(Review);

exports.getReview = factory.getOne(Review, 'reviewId');

exports.postReview = factory.createOne(Review);

exports.patchReview = factory.updateOne(Review, 'reviewId');

exports.deleteReview = factory.deleteOne(Review, 'reviewId');

exports.deleteAllReviews = factory.deleteAll(Review);
