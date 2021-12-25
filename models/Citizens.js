const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Citizens = new Schema({
    idCard: { type: String, default: '' },
    fullname: { type: String, required: true },
    gender: { type: String, required: true, enum: ['male', 'female'] },
    birthday: { type: Date, required: true, min: '1800-1-1', max: Date.now },
    idAdress: { type: String, required: true },
    educational: { type: String, required: true },
    phone: { type: String, },
    regularAdress: { type: String, required: true, default: '' },
    temporaryAdress: { type: String, required: true, default: '' },
    job: { type: String, required: true, default: '' },
    religion: { type: String, required: true, default: '' },

});

module.exports = mongoose.model('citizen', Citizens);
