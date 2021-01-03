const express = require('express');

const userController = require('../controllers/user');
const authController = require('../controllers/auth');

const router = express.Router();

router.use(authController.protectRoute);

router
  .use('/profile', userController.setUserId)
  .route('/profile')
  .get(userController.getUser)
  .patch(userController.patchUser)
  .delete(userController.deleteUser);

router.use(authController.restrictTo('user'));

router.route('/').get(userController.getUsers).post(userController.postUser);

router
  .use('/:userId', userController.checkUser)
  .route('/:userId')
  .get(userController.getUser)
  .patch(userController.patchUser)
  .delete(userController.deleteUser);

module.exports = router;
