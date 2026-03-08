const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    warnings: {
        type: Number,
        default: 0
    },
    bans: {
        type: Number,
        default: 0
    },
    mutes: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('User', userSchema);