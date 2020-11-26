const mongoose = require("mongoose");

const GiftSchema = new mongoose.Schema({

    wichtel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Gift = mongoose.model("Gift", GiftSchema);
module.exports = Gift;