const User = require('../models/User')
const bcrypt = require('bcryptjs');

module.exports = {
    async store(req, res) {
        try {
            let { email, name, password } = req.body;

            let user = await User.findOne({ email: email });

            if(!user) {
                password = await bcrypt.hash(password, 8);
                user = await User.create({ name, email, password });

                return res.status(200).json({ message: `O usuário ${user.name} foi criado com sucesso!`});
            }

            return res.status(422).json({ message: `Já existe um usuário cadastrado com este e-mail.`});

        } catch (error) {
            return res.status(500).json({ message: `Houve um erro ao criar um novo usuário. ${error.message}` });
        }
    }
}
