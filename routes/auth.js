const express = require('express');

const authController = require('../controllers/auth');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);

router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
  '/updatePassword',
  authMiddleware.protectRoute,
  authController.updatePassword
);

module.exports = router;
