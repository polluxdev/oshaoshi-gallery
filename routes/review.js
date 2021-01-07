const express = require('express');

const reviewController = require('../controllers/review');
const authMiddleware = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.get('/', reviewController.getReviews);

router.use(authMiddleware.protectRoute);

router
  .use(authMiddleware.restrictTo('user', 'guest'))
  .route('/')
  .delete(reviewController.deleteAllReviews);

router.use(authMiddleware.restrictTo('guest'));

router
  .route('/')
  .post(reviewController.setPhotoUserId, reviewController.postReview);

router
  .use('/:reviewId', reviewController.checkReview)
  .route('/:reviewId')
  .get(reviewController.getReview)
  .patch(reviewController.patchReview)
  .delete(reviewController.deleteReview);

module.exports = router;
