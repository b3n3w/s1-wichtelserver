var mongoose = require('mongoose')

const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    vorname: {
        type: String
    },
    nachname: {
        type: String
    },
    street: {
        type: String
    },
    zip: {
        type: Number
    },
    city: {
        type: String
    },
});


UserSchema.pre(
    'save',
    async function (next) {
        const user = this;
        const hash = await bcrypt.hash(this.password, 10);

        this.password = hash;
        next();
    }
);

module.exports = mongoose.model('users', UserSchema);
