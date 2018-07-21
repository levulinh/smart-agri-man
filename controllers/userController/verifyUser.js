const Verify = require('../../models/Verify');
const User = require('../../models/User');
const { accountSid, authToken } = require('../../config').twilioConfig;
const client = require('twilio')(accountSid, authToken);

/**
 * Ham chuyen hoa so dien thoai chua dung chuan ve dang
 * chuan co dau so +84
 * @param {Number || String} phone
 */
function getStandardPhone(phone) {
  const phoneStr = String(phone).replace(/[^\d]/g, '');
  if (phoneStr.indexOf('0') === 0) {
    return `+84${phoneStr.substr(1)}`;
  }
  return `+${phoneStr}`;
}

module.exports = function verifyUser(app) {
  app.post('/api/generate-code', async (req, res) => {
    try {
      const phoneNumber = getStandardPhone(req.body.phoneNumber);
      // Bao loi neu khong tim thay userId trong req.body
      if (!phoneNumber) {
        res.status(422).json({
          error: true,
          message: 'userId is missing!',
        });
      }
      // Tim user co phoneNumber trong database
      const user = await User.findOne({ phoneNumber });
      if (user !== null) {
        // Get user's phone number
        const phone = getStandardPhone(user.phoneNumber);
        // Generate a code
        const secretCode = Math.floor(Math.random() * 8999 + 1000);

        // Gui tin nhan chua code den user
        await client.messages.create({
          to: phone,
          body: `Your code is ${secretCode}`,
          from: '+12252302684',
        });

        // Update code trong database, neu chua co
        // thi tao ban ghi moi
        await Verify.update(
          { phoneNumber },
          { phoneNumber, secretCode, valid: true },
          { upsert: true, setDefaultsOnInsert: true },
        );

        // Tra ve chuoi json bao gui sms thanh cong
        res.json({
          error: false,
          message: 'SMS sent',
        });
      } else {
        // Neu khong thay user thoa man
        res.status(422).json({
          error: true,
          message: 'User not found',
        });
      }
    } catch (err) {
      // Xu ly loi bat ky
      res.status(422).json(err);
    }
  });

  app.post('/api/verify-code', async (req, res) => {
    try {
      const { secretCode } = req.body;
      const phoneNumber = getStandardPhone(req.body.phoneNumber);
      if (!phoneNumber || !secretCode) {
        res.status(422).json({
          error: true,
          message: 'UserId or SecretCode is missing!',
        });
      }
      // Tim document co userId = userId trong database
      const verify = await Verify.findOne({ phoneNumber });
      // Kiem tra thoa man secretCode hay khong
      if (verify !== null && verify.valid && verify.secretCode === secretCode) {
        // Update lai gia tri cua valid
        await Verify.update({ phoneNumber }, { valid: false });
        res.json({
          error: false,
          message: 'succesfully verified user',
        });
      } else {
        res.status(422).json({
          error: true,
          message: 'verify user failed',
        });
      }
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
