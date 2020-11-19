const Group = require("../model/Group");
const User = require("../model/User");

exports.addUsertoGroup = async (req, res) => {

    try {
        let user = User.findById(req.body._id)
    } catch (err) {

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

        
        console.log(req.body)
        //create new group and add Creator of Group to Members
        const group = new Group({
            groupname: req.body.name,
            decription: req.body.description,
            groupmembers: [creator]
        });

        let data = await group.save();
        res.status(201).json({ data });

    } catch (error) {
        res.status(400).json({ error: error });
    }
}

exports.getAllGroups = async (req, res) => {

}
