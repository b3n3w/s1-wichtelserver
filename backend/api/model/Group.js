const mongoose = require("mongoose");


const GroupSchema = new mongoose.Schema({

    groupname: {
        type: String,
        unique: true,
        required: true,
    },
    wichtelStart:{
        type: Boolean,
        default: false,
    },
    groupdescription: {
        type: String,
        default: ""
    },
    entryKey: {
        type: String,
        required: ""
    },
    groupmembers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})

const Group = mongoose.model("Group", GroupSchema);
module.exports = Group;