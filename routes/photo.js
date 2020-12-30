const express = require('express');

const photoController = require('../controllers/photo');
const authController = require('../controllers/auth');

const router = express.Router();

router
  .route('/')
  .get(photoController.getPhotos)
  .post(
    authController.protectRoute,
    authController.restrictTo('user'),
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

module.exports = router;
