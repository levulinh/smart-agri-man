const mongoose = require('mongoose');

const Device = mongoose.model('Device');

module.exports = app => {
  app.post('/api/device', async (req, res) => {
    const { uid, macAddress, name, location } = req.body;
    const device = await Device.findOne({ macAddress }).exec();
    if (device) {
      if (device._user) {
        res
          .status(422)
          .send({ message: 'This device is currently belong to another user' });
      } else {
        await Device.findOneAndUpdate(
          { macAddress },
          {
            _user: uid,
            name,
            location,
            $push: { history: uid },
          },
          { safe: true, upsert: true },
        ).exec();

        res.send(await Device.findOne({ macAddress }).exec());
      }
    } else {
      await new Device({
        macAddress,
        name,
        location,
        _user: uid,
        history: [uid],
      }).save();

      res.send(await Device.findOne({ macAddress }).exec());
    }
  });

  app.delete('/api/device', async (req, res) => {
    const { macAddress } = req.body;
    await Device.findOneAndUpdate({ macAddress }, { _user: undefined }).exec();
    res.send(await Device.findOne({ macAddress }).exec());
  });
};
