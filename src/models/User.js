const mongoose = require('mongoose');

const PeopleSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String, 
}, {
    timestamps: true
});

module.exports = mongoose.model('Users', PeopleSchema);