const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');



// Schema with properties
const userSchema = new mongoose.Schema({
    _id: {
        type: ObjectID,
        auto: true
    },
    name: {
        type: String,
        required: [true, "message"]
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    address: {
        type: String,
    },
    city: {
        type: String
    },
    zipCode: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    favorites: {
        type: [String],
    },
    hasAvatar: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        default: "/public/default.png"
    },
    reviews: {
        type: [String],
    },
    bookings: {
        type: [String],
    },
    type: {
        type: String,
        enum: [ "User", "Owner", "Worker", "Admin" ],
        default: "User",
        required:true
    },
    stores: {
        type: [String],
    }

});


// Compiling the schema into a model
const User = mongoose.model('users', userSchema, 'users');


module.exports = User; 