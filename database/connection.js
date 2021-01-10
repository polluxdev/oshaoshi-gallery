const config = require('../config');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const uri = `${config.mongo.MONGO_URI}/${config.mongo.MONGO_DB}`;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
};

if (config.NODE_ENV === 'production') {
  mongoose
    .connect(uri, options)
    .then(() => {
      console.log('CONNECTED TO MONGODB!');
    })
    .catch(() => {
      console.error('FAILED TO CONNECT TO MONGODB!');
    });
} else {
  mongoose
    .connect(uri, options)
    .then(() => {
      console.log('CONNECTED TO MONGODB!');
    })
    .catch(() => {
      console.error('FAILED TO CONNECT TO MONGODB!');
    });
}

mongoose.connection
  .once('open', function () {
    console.log('Connection has been made');
  })
  .on('error', function (error) {
    console.log('Connect error', error);
  })
  .on('disconnected', function () {
    console.log('Connection disconnected');
  });

module.exports = mongoose;
