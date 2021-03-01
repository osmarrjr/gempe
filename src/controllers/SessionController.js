const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = {

    async store (req, res) {
        const { email, password } = req.body;
        let user = await User.findOne({ email: email });

        if(!user) {
             return res.json({ message: 'Usuário não encontrado.', type: 'User' });

        }

        if(!(await bcrypt.compare(password, user.password))) {
            return res.json({ message: 'Senha incorreta.', type: 'Password' });
        }

        const token = jwt.sign({ id: user.id }, authConfig.secret, { expiresIn: authConfig.expiresIn});

        return res.json({ token });
    }
}