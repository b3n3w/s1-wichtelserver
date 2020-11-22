const { ObjectID } = require("mongodb");
const Group = require("../model/Group");
const User = require("../model/User");


exports.addUsertoGroup = async (group, user) => {

    console.log(group);
    console.log(user);
    try {
        group.groupmembers.push(user);
        await group.save();
    } catch (err) {
        console.log(err);
    }

}


exports.createGroup = async (req, res) => {

    try {
        let isCreated = await Group.find({ name: req.body.name });
        let creator = await User.findById(req.body.creator);

        if (isCreated.length >= 1) {
            return res.status(409).json({
                message: "Gruppenname ist schon vergeben"
            });
        }

        var entryKey = Math.random().toString().slice(2, 6);


        //create new group and add Creator of Group to Members
        const group = new Group({
            groupname: req.body.name,
            groupdescription: req.body.description,
            entryKey: entryKey,
            groupmembers: [creator]

        });

        let data = await group.save();
        res.status(201).json({ data });

    } catch (error) {
        res.status(400).json({ error: error });
    }
}

exports.getGroupbyKey = async (req, res) => {

    try {

        let entryKey = req.body.groupKey;
        if (!entryKey) {
            res.status(409).json({
                message: "Kein Gruppenschlüssel eingegeben"
            })
        };
        const group = await Group.findOne({ entryKey: entryKey });

        if (!group) {
            res.status(409).json({
                message: "Keine Gruppe mit diesem Schlüssel gefunden"
            })
        }

        let user = await User.findById(req.body.userID);

        let tempUser = Group.find({ "groupmembers": ObjectID(user._id) });

        await Group.updateOne({ _id: group._id }, { $addToSet: { groupmembers: user._id } });

        return res.status(201).send({
            message: "Gruppe beigetreten"
        });

    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

exports.getAllGroups = async (req, res) => {

}



exports.getGroupMembers = async (req, res) => {
    let groupId = req.params.id;
   
    if (groupId === undefined) {
        return res.send("No Group Param");
    }
    if (groupId === "") {
        return res.send("No Group Param");
    } else {
        if (req.params) {
            console.log(req.params.id)
            Group.findOne({ _id: groupId })
                .populate('groupmembers', 'username').exec(function (err, posts) {
                    if (err) {
                        console.log(err);
                    }
                    let members = [];
                    let data = [];
                    posts.groupmembers.forEach(element => {
                        members.push({ username: element.username })
                    });
                    data.push({
                        groupmembers: members,
                        groupstatus: posts.wichtelStart
                    });
                    res.json(data);
                })
        } else {
            return res.status(409).send();
        }
    }
}



