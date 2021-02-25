const mongoose = require('mongoose');

const PeopleSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('People', PeopleSchema);