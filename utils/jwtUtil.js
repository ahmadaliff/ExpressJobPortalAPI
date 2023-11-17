const env = require("dotenv");
const jwt = require("jsonwebtoken");
env.config();

const secretKey = process.env.SECRET_KEY;
const secretKeyForForgetPassword = process.env.SECRET_KEY_FOR_FORGET_PASSWORD;
exports.createToken = (user) => {
  const { role, id } = user;
  if (!role || !id) {
    return false;
  }
  return jwt.sign({ id, role }, secretKey);
};

exports.verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

exports.createTokenForForgetPassword = (new_password, email) => {
  if (!new_password || !email) {
    return false;
  }
  return jwt.sign({ new_password, email }, secretKeyForForgetPassword);
};
exports.verifyTokenForForgetPassword = (token) => {
  return jwt.verify(token, secretKeyForForgetPassword);
};
