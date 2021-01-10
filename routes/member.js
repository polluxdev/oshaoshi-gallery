const express = require('express');

const memberController = require('../controllers/member');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware.protectRoute, authMiddleware.restrictTo('user'));

router
  .route('/')
  .get(memberController.getMembers)
  .post(
    memberController.uploadImage,
    memberController.checkImage,
    memberController.processImage,
    memberController.postMember
  )
  .delete(memberController.collectImage, memberController.deleteAllMembers);

router
  .use('/:memberId', memberController.checkMember)
  .route('/:memberId')
  .get(memberController.getMember)
  .patch(
    memberController.uploadImage,
    memberController.checkImage,
    memberController.processImage,
    memberController.patchMember
  )
  .delete(memberController.deleteMember);

module.exports = router;
