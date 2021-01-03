const express = require('express');

const reviewController = require('../controllers/review');
const authController = require('../controllers/auth');

const router = express.Router({ mergeParams: true });

router.use(authController.protectRoute, authController.restrictTo('user'));

router
  .route('/')
  .get(reviewController.getReviews)
  .post(reviewController.setPhotoUserId, reviewController.postReview)
  .delete(reviewController.deleteAllReviews);

router
  .use('/:reviewId', reviewController.checkReview)
  .route('/:reviewId')
  .get(reviewController.getReview)
  .patch(reviewController.patchReview)
  .delete(reviewController.deleteReview);

module.exports = router;
