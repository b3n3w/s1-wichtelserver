
const mongoose = require("mongoose");
const InvitationSchema = new mongoose.Schema({

    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    personalMessage: {
        type: String
    }
});



const Invitation = mongoose.model("Invitation", InvitationSchema);
module.exports = Invitation;