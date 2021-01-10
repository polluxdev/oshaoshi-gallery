const fs = require('fs');

exports.deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      throw err;
    }
  });
};

exports.deleteAllFiles = (filePathArray) => {
  filePathArray.forEach((element) => {
    fs.unlink(element, (err) => {
      if (err) {
        throw err;
      }
    });
  });
};
