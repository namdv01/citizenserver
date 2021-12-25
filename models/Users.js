const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isToggle: { type: Boolean, default: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    level: { type: String, enum: ['A1', 'A2', 'A3', 'B1', 'B2'] },
    location: { type: String, required: true, default: '' }
});

module.exports = mongoose.model('users', Users);