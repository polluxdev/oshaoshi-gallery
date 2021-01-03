const express = require('express');

const memberController = require('../controllers/member');
const authController = require('../controllers/auth');

const router = express.Router();

router.use(authController.protectRoute, authController.restrictTo('user'));

router
  .route('/')
  .get(memberController.getMembers)
  .post(memberController.postMember);

router
  .use('/:memberId', memberController.checkMember)
  .route('/:memberId')
  .get(memberController.getMember)
  .patch(memberController.patchMember)
  .delete(memberController.deleteMember);

module.exports = router;
