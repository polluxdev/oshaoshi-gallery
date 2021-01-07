const express = require('express');

const userController = require('../controllers/user');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware.protectRoute, authMiddleware.restrictTo('guest'));

router
  .route('/profile')
  .get(
    userController.setUserId,
    userController.checkUser,
    userController.getUser
  )
  .patch(
    userController.setUserId,
    userController.checkUser,
    userController.uploadImage,
    userController.checkImage,
    userController.processImage,
    userController.patchUser
  )
  .delete(
    userController.setUserId,
    userController.checkUser,
    userController.checkImage,
    userController.deleteUser
  );

router.use(authMiddleware.restrictTo('user'));

router.route('/').get(userController.getUsers).post(userController.postUser);

router
  .use('/:userId', userController.checkUser)
  .route('/:userId')
  .get(userController.getUser)
  .patch(userController.patchUser)
  .delete(userController.deleteUser);

module.exports = router;
