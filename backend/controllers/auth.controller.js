const signUp = require("./auth/signUp").signUp;
const login = require("./auth/login").login;
const googleAuth = require("./auth/googleAuth").googleAuth;

module.exports = {
  signUp,
  login,
  googleAuth,
};
