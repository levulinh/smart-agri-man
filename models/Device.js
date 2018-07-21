const mongoose = require('mongoose');

const { Schema } = mongoose;

const DeviceSchema = new Schema(
  {
    macAddress: { type: String, ref: 'Data' },
    name: String,
    location: String,
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    history: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Device', DeviceSchema);
