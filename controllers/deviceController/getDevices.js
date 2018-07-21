const mongoose = require('mongoose');
const _ = require('lodash');
const aigle = require('aigle');

// https://hackernoon.com/how-to-use-lo-dash-functions-with-async-await-b0be7709534c
// Thu vien ho tro su dung async/await cung lodash
aigle.mixin(_);

const Data = mongoose.model('Data');
const Device = mongoose.model('Device');

module.exports = app => {
  app.get('/api/data/:mac/:lim', async (req, res) => {
    const data = await Data.find({ macAddress: req.params.mac })
      .limit(Number(req.params.lim))
      .sort({ timestamp: -1 })
      .exec();
    res.send(data);
  });

  app.get('/api/device/:userid', async (req, res) => {
    const devices = await Device.find({
      _user: req.params.userid,
    })
      .lean()
      .sort({ updatedAt: -1 })
      .exec();

    await aigle.map(devices, async device => {
      const data = await Data.findOne({ macAddress: device.macAddress })
        .lean()
        .sort({ timestamp: -1 })
        .exec();
      aigle.extend(device, { data });
    });

    return res.send(devices);
  });

  app.get('/api/allDevice', async (req, res) => {
    const devices = await Device.find({})
      .populate('_user')
      .exec();
    res.send(devices);
  });
};
