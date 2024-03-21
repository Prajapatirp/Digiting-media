const { register, login } = require('../service/userService');

module.exports = {
  registerController: (req, res, next) => {
    return register(req, res, next);
  },

  loginController: (req, res, next) => {
    return login(req, next);
  },
};