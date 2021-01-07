const multer = require('multer');

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    const error = new AppError(
      'Not an image! Please upload an image file!',
      400
    );
    cb(error, false);
  }
};

const multerStorage = multer.memoryStorage();

const upload = multer({
  storage: multerStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }
});

module.exports = upload;