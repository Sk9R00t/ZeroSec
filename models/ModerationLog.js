const mongoose = require('mongoose');

const moderationLogSchema = new mongoose.Schema({
    actionType: { type: String, required: true },
    moderator: { type: String, required: true },
    targetUser: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const ModerationLog = mongoose.model('ModerationLog', moderationLogSchema);

module.exports = ModerationLog;
