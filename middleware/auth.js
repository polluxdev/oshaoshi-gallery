const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.protectRoute = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token;

  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Unauthorized!', 401));
  }

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_TOKEN_SECRET_KEY
  );

  const user = await User.findById(decoded.userId);

  if (!user) {
    return next(new AppError('User does no longer exists!', 401));
  }

  if (user.changePasswordAt(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please re-login.', 401)
    );
  }

  req.user = user;

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next(new AppError("You don't have permission!", 403));
    }

    next();
  };
};