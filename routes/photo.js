const express = require('express');

const photoController = require('../controllers/photo');
const authMiddleware = require('../middleware/auth');

const reviewRoutes = require('../routes/review');

const router = express.Router();

router.get('/', photoController.getPhotos);
router.get('/:photoId', photoController.checkPhoto, photoController.getPhoto);

router.use('/:photoId/reviews', reviewRoutes);

router.use(authMiddleware.protectRoute, authMiddleware.restrictTo('guest'));

router
  .route('/')
  .post(
    photoController.setUserId,
    photoController.uploadImage,
    photoController.processImage,
    photoController.postPhoto
  );

router
  .use('/:photoId', photoController.checkPhoto)
  .route('/:photoId')
  .patch(
    photoController.uploadImage,
    photoController.checkImage,
    photoController.processImage,
    photoController.patchPhoto
  )
  .delete(photoController.deletePhoto);

module.exports = router;
