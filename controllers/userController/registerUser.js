const User = require('../../models/User');
const bcrypt = require('bcrypt');

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

module.exports = function registerUser(app) {
  /**
   * Register a new account
   */
  app.post('/api/register', async (req, res) => {
    try {
      // Lay thong tin tu request body
      const { password, email, fullName, address } = req.body;

      let { phoneNumber } = req.body;
      // Chuan hoa so dien thoai
      phoneNumber = getStandardPhone(phoneNumber);

      // Kiem tra xem so dien thoai hoac email da bi trung hay chua
      const result = await User.find({ $or: [{ email }, { phoneNumber }] });

      if (result.length === 0) {
        // Neu chua trung
        // Ma hoa mat khau bang bcrypt
        const hash = await bcrypt.hash(password, saltRounds);

        // Tao document user de them vao collection users
        const user = {
          phoneNumber: getStandardPhone(phoneNumber),
          hash,
          email,
          fullName,
          address,
        };

        let newUser = await User.create(user);

        // Tra ve thong tin nguoi dung len client
        newUser = JSON.parse(JSON.stringify(newUser));
        newUser.error = false;
        newUser.hash = 'hidden';
        res.json(newUser);
      } else {
        // Neu da ton tai email hoac so dien thoai
        res.status(422).json({
          error: true,
          message: 'email or phone number is not available',
        });
      }
    } catch (err) {
      // Neu co loi bat ky xay ra
      res.status(422).send(err);
    }
  });
};
