const User = require('../models/User')

module.exports = {
    async store(req, res) {
        const { email, name, password } = req.body;

        let user = await User.findOne({ email: email });

        if(!user) {
            user = await User.create({ name, email, password });
        }

        return res.json(user);
    }
}
