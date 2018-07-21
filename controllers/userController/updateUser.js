const User = require('../../models/User');

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

module.exports = function updateUser(app) {
  app.put('/api/user', async (req, res) => {
    try {
      const { id, fullName, address, deviceId } = req.body;

      console.log(fullName);

      if (!id) {
        res.status(422).json({
          error: true,
          message: 'id is required!',
        });
      } else {
        await User.update(
          { _id: id },
          {
            fullName,
            address,
            deviceId,
          },
        );

        getUserById(res, id);
      }
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
