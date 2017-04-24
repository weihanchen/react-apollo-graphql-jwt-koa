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


userSchema.pre('save', function (next) {
    const user = this;
    if (user.isModified('password') || this.isNew) {
        const hash = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
        user.password = hash;
    }
    next();
});

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);