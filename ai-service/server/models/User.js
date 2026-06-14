const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: String,
  savedNotes: [
    {
      article: Object,
      note: String,
    },
  ],
  likedNews: [Object],
});

// ✅ Fix: prevent OverwriteModelError
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
