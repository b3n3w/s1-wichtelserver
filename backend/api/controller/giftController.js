const Group = require("../model/Group");
const Gift = require("../model/Gift");
const User = require("../model/User");
var nodemailer = require('../controller/mailController');
var path = require('path');
var fs = require('fs');
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

            res.status(201).send(map)
            sendMails(map)
        })
}


exports.getGiftPartner = async (req, res) => {

    try {
        await Gift.findOne({ group: req.query.groupID, wichtel: req.query.userID }).populate({ path: 'receiver', model: 'User' })
            .exec(function (err, gift) {
                if (err) {
                    res.status(409).send({ message: "No such gift found" })
                }
                let imageAsBase64 ="";
                if (gift.receiver.profileImage == true) {

                    imageAsBase64 = fs.readFileSync(path.join(__dirname + '..', '..', '..', 'uploads/' + gift.receiver._id + ".jpg"), 'base64');

                } else {
                    imageAsBase64 = fs.readFileSync(path.join(__dirname + '..', '..', '..', 'uploads/test.jpg'), 'base64');
                }
                let partnerData = {
                    username: gift.receiver.username,
                    firstname: gift.receiver.firstname,
                    lastname: gift.receiver.lastname,
                    street: gift.receiver.street,
                    zip: gift.receiver.zip,
                    city: gift.receiver.city,
                    image: imageAsBase64,
                    likes: gift.receiver.likes,
                    dislikes: gift.receiver.dislikes,
                    createdAt: gift.createdAt
                }
                res.status(200).send(partnerData);
            });
    } catch (err) {
        console.log(err)
    }
}

async function sendMails(group) {
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
