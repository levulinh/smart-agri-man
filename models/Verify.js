const mongoose = require('mongoose');

const { Schema } = mongoose;

const verifySchema = new Schema({
  phoneNumber: { type: String, required: true },
  secretCode: { type: Number, required: true },
  valid: { type: Boolean, required: true },
});

// Mongoose se tu dong tim den collection 'verifies'
// thong qua tim dang so nhieu cua tu 'Verify'
module.exports = mongoose.model('Verify', verifySchema);
