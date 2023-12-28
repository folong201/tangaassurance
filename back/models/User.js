const mongoose = require('mongoose');

const User1 = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    role: String,
    status: String,
    createdAt: Date,
    updatedAt: Date
});


const User = mongoose.model('User', User1);
module.exports = User;