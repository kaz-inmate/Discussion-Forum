const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // secretToken: {
  //   type: String
  // },
  // // active : {
  // //   type: Boolean
  // // },
  posts : [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;