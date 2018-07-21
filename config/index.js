const config = require('../config/config.json');

module.exports = {
  userConfig: {
    username: config.database.username,
    password: config.database.password,
  },
  twilioConfig: {
    accountSid: config.twilio.accountSid,
    authToken: config.twilio.authToken,
  },
};
