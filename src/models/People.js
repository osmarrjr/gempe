const mongoose = require('mongoose');

const PeopleSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    createdAt: Date,
    updatedAt: Date,
});

module.exports = mongoose.model('Peoples', PeopleSchema);