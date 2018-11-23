const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    sub: String,
    bnetId: String,
    battletag: String,
    provider: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;