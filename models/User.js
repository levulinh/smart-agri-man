const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    hash: { type: String, required: true },
    fullName: String,
    address: String,
  },
  { timestamps: true },
);

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

UserSchema.methods.setPassword = async password => {
  this.hash = await bcrypt.hash(password, saltRounds);
};

UserSchema.methods.validPassword = async password =>
  bcrypt.compare(password, this.hash);

module.exports = mongoose.model('User', UserSchema);
