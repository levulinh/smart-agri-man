const mongoose = require('mongoose');

const { Schema } = mongoose;

const DataSchema = new Schema({
  tempWater: Number,
  lightAir: Number,
  macAddress: { type: String, ref: 'Device' },
  color: [Number],
  abs: [Number],
  timeStamp: Number,
});

module.exports = mongoose.model('Data', DataSchema, 'data');
