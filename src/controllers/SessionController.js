const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = {

    async store (req, res) {
        const { email, password } = req.body;
        let user = await User.findOne({ email: email });

        if(!user) {
            return res.status(400).json({ message: 'Usuário não encontrado.' });
        }

        if(!(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Senha incorreta.' });
        }

        const token = jwt.sign({ id: user.id }, authConfig.secret, { expiresIn: authConfig.expiresIn});

        return res.json({ token });
    }
}