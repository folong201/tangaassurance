const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    role: String,
    status: String,
    createdAt: Date,
    updatedAt: Date
});


const User = mongoose.model('User', Userschema);
module.exports = User;