'use strict';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema;

// set up a mongoose model
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    displayName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});



userSchema.methods.generateHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);