const People = require('../models/People');

module.exports = {
    async store (req, res) {
        const { name, email, phone } = req.body;
        let createdAt = Date.now();
        let updatedAt= Date.now();

        let People = await People.findOne({ email: email});

        if(!People) {
            People = await People.create({ name, email, phone, createdAt, updatedAt });
        }
        
        return res.json(People);
    },

    async show (req, res) {
        const { id } = req.params;

        let people = await People.findById(id);
        return res.json((people);
    }
}