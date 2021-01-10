const express = require('express');

const router = express.Router();
const authRouter = require('./auth');
const memberRouter = require('./member');
const photoRouter = require('./photo');
const userRouter = require('./user');

router.use('/auth', authRouter);
router.use('/members', memberRouter);
router.use('/photos', photoRouter);
router.use('/users', userRouter);

module.exports = router;
