const mongoose = require("mongoose");


const GroupSchema = new mongoose.Schema({

    groupname: {
        type: String,
        unique: true,
        required: true,
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
            ref: 'users'
        }
    ]
})

const Group = mongoose.model("Group", GroupSchema);
module.exports = Group;