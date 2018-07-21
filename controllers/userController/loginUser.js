const User = require('../../models/User');
const bcrypt = require('bcrypt');

module.exports = function loginUser(app) {
  /**
   * Login a user with emailOrPhone and password
   */
  app.post('/api/login', async (req, res) => {
    try {
      const { emailOrPhone, password } = req.body;

      // Kiem tra co ton tai tai khoan voi email hoac so dien thoai do hay khong
      let user = await User.findOne({
        $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
      });

      if (user !== null) {
        // Neu co
        // So sanh mat khau
        const isMatch = await bcrypt.compare(password, user.hash);

        if (isMatch) {
          // Neu khop tra ve thong tin nguoi dung
          user = JSON.parse(JSON.stringify(user));
          user.hash = 'hidden';
          user.error = false;
          res.json(user);
        } else {
          // Neu khong khop
          res.status(422).json({
            error: true,
            message: 'wrong password',
          });
        }
      } else {
        // Neu khong co nguoi dung nao thoa man
        res.status(422).json({
          error: true,
          message: 'User not found',
        });
      }
    } catch (err) {
      // Neu co loi bat ky
      res.status(422).send(err);
    }
  });
};
