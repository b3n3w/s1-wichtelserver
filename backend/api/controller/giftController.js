const Group = require("../model/Group");
const Gift = require("../model/Gift");
const User = require("../model/User");
const { updateOne } = require("../model/Group");
var nodemailer = require('../controller/mailController');


exports.startWichteln = async (req, res) => {

    let groupUsers = []

    let groupId = req.body.groupId
    let group = await Group.findOne({ _id: groupId })
        .populate('groupmembers', 'username').exec(function (err, users) {
            if (err) {
                console.log(err);
            }

            // Check if wichtel already started
            if (users.wichtelStart === true) {
                return res.status(403).send({
                    message: "Wichteln wurde bereits gestartet <3"
                })
            }

            users.groupmembers.forEach(element => {
                groupUsers.push(element)
            });

            //check if enough members in Group to start wichteln

            console.log("groupUsers")
            if (groupUsers.length < 3) {
                return res.status(403).send({
                    message: "Leider sind zu wenige Wichtel in dieser Gruppe. Mindestens drei werden benötigt"
                });

            }

            //randomise group
            groupUsers = shuffle(groupUsers)

            //find wichtel assignments 
            let map = new Map()

            for (let [index, val] of groupUsers.entries()) {
                if (val === groupUsers[groupUsers.length - 1]) {
                    map.set(val, groupUsers[0])
                } else {
                    map.set(val, groupUsers[index + 1])
                }
            }


            //Create new gift paris of wichtel and receiver
            map.forEach((value, key) => {
                let gift = new Gift({
                    wichtel: key._id,
                    receiver: value._id,
                    group: groupId,
                })
                gift.save(function (err) {
                    if (err)
                        return console.log('Could not save gift', err);
                });
            })

            updateGroup(groupId);
            sendMails(map)
            return res.status(201).send(map)
        })
}
async function sendMails(group){
    let doc = await nodemailer.sendWichtelMails(group);
}


async function updateGroup(groupId) {
    let doc = await Group.findOneAndUpdate({ _id: groupId }, { wichtelStart: true });
}

/**
 * Fisher-Yates Shuffle
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 */

function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}
