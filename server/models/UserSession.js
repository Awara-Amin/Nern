const mongoose = require('mongoose');

const UserSessionSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: ''
    },

    timestamp: {
        type: Date,
        default: Date.now()
    },

    isDeleted: {
        // type: Boolean.apply,
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('UserSession', UserSessionSchema);
