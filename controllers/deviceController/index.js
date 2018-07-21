const addDevice = require('./addDevice');
const getDevice = require('./getDevices');

module.exports = app => {
  addDevice(app);
  getDevice(app);
};
