const registerUser = require('./registerUser');
const loginUser = require('./loginUser');
const updateUser = require('./updateUser');
const verifyUser = require('./verifyUser');
const updatePassword = require('./updatePassword');

module.exports = function userController(app) {
  registerUser(app);
  loginUser(app);
  updateUser(app);
  verifyUser(app);
  updatePassword(app);
};
