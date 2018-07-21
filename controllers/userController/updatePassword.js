const bcrypt = require('bcrypt');
const User = require('../../models/User');

const saltRounds = 10;

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

async function getUserById(res, id) {
  try {
    let user = await User.findById(id);
    user = JSON.parse(JSON.stringify(user));
    user.error = false;
    user.hash = 'hidden';
    res.json(user);
  } catch (err) {
    res.status(422).json({
      error: true,
      message: err,
    });
  }
}

module.exports = function updatePassword(app) {
  app.post('/api/update-password', async (req, res) => {
    try {
      const { password } = req.body;
      const phoneNumber = getStandardPhone(req.body.phoneNumber);

      if (!password || !phoneNumber) {
        res.status(422).json({
          error: true,
          message: 'New password or phone is missing',
        });
      }

      const user = await User.findOne({
        phoneNumber: getStandardPhone(phoneNumber),
      });
      if (!user) {
        res.status(422).json({
          error: true,
          message: 'New password or phone is missing',
        });
      } else {
        const id = user._id;
        const hash = await bcrypt.hash(password, saltRounds);
        await User.update(
          { phoneNumber },
          {
            hash,
          },
        );

        getUserById(res, id);
      }
    } catch (error) {
      res.status(422).send(error);
    }
  });
};
