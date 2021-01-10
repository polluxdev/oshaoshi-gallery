require('dotenv').config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  DOMAIN_APP: process.env.DOMAIN_APP,
  API_VERSION: process.env.API_VERSION,
  PORT: process.env.PORT,
  mongo: {
    MONGO_URI: process.env.MONGO_LOCAL_URI,
    MONGO_DB: process.env.MONGO_DB,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PW: process.env.MONGO_PW
  },
  jwt: {
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_EXPIRED_TIMEOUT: process.env.JWT_EXPIRED_TIMEOUT,
    JWT_COOKIE_EXPIRED_TIMEOUT: process.env.JWT_COOKIE_EXPIRED_TIMEOUT
  },
  mailtrap: {
    MAILTRAP_HOST: process.env.MAILTRAP_HOST,
    MAILTRAP_PORT: process.env.MAILTRAP_PORT,
    MAILTRAP_USERNAME: process.env.MAILTRAP_USERNAME,
    MAILTRAP_PASSWORD: process.env.MAILTRAP_PASSWORD
  }
};
