const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for Users
const GroupMessageSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    body: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: Date.now,
    },
    
});

module.exports = GroupMessage = mongoose.model(
    'group_messages',
    GroupMessageSchema
);