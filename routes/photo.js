const express = require('express');

const photoController = require('../controllers/photo');
const authController = require('../controllers/auth');
const reviewController = require('../controllers/review');

const reviewRoutes = require('../routes/review');

const router = express.Router();

router.use('/:photoId/reviews', reviewRoutes);

router
  .route('/')
  .get(photoController.getPhotos)
  .post(
    authController.protectRoute,
    authController.restrictTo('user'),
    photoController.setUserId,
    photoController.postPhoto
  );

router
  .route('/:photoId')
  .get(photoController.checkPhoto, photoController.getPhoto)
  .patch(
    authController.protectRoute,
    authController.restrictTo('user'),
    photoController.checkPhoto,
    photoController.patchPhoto
  )
  .delete(
    authController.protectRoute,
    authController.restrictTo('user'),
    photoController.checkPhoto,
    photoController.deletePhoto
  );

router
  .route('/:photoId/reviews')
  .post(
    authController.protectRoute,
    authController.restrictTo('user'),
    reviewController.postReview
  );

module.exports = router;
