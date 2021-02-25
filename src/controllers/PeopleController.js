const People = require('../models/People');

module.exports = {

    async index (req, res) {
        try {
            let persons = await People.find();

            return res.json(persons);

        } catch (error) {
            return res.status(500).json({ error: `Houve algum erro ao solicitar a lista de usuários. ${error.message}`});
        }
    },

    async store (req, res) {
        try {
            const { name, email, phone } = req.body;

            let person = await People.findOne({ email: email});

            if(!person) {
                person = await People.create({ name, email, phone });
                return res.status(200).json({ message: `O usuário ${person.name} foi cadastrado com sucesso!`});
            }

            return res.status(422).json({ message: `O usuário ${person.name} já está cadastrado!` });

        } catch (error) {
            return res.status(500).json({ error: `Houve um erro ao salvar um novo usuário. ${error.message}`});
        }
    },

    async show (req, res) {
        try {
            const { id } = req.params;
            let person = await People.findById(id);

            return res.json(person);

        } catch (error) {
            return res.status(500).json({ error: `Houve um erro ao listar este usuário. ${error.message}`});
        }
    },

    async getByFilter (req, res) {
        try {
            const { q } = req.query;
            const isEmail = q.includes('@');

            if(!isEmail) {
                const peoples = await People.find({ name: new RegExp(q, 'i')});
                return res.json(peoples);
            }

            const peoples = await People.find({ email: new RegExp(q, 'i')});
            
            return res.json(peoples);
        } catch (error) {
            return res.status(500).json({ error: `Houve um erro ao listar este usuário. ${error.message}`});
        }
    },

    async update (req, res) {
        try {
            const { id } = req.params;
            const { email } = req.body;
            const person = await People.findById(id);
            let existEmail = false;

            if(req.body.email !== person.email) {
                existEmail = await People.findOne({
                    attributes: ['email'],
                    where: {
                        email
                    }
                });
            }

            if(!existEmail) {
                await person.update({
                    ...req.body,
                });
    
                await person.save();
    
                return res.status(200).json({ message: `O usuário ${person.name} foi atualizado!` });
            }

            return res.status(422).json({ message: `Já existe um usuário cadastrado com este e-mail.` });
        } catch (error) {
            return res.status(500).json({ error: `Ocorreu um erro ao atualizar este usuário. ${error.message}` });
        }
    },

    async delete (req, res) {
        try {
            const { id } = req.params;
            const person = await People.findById(id);

            await person.delete();

            return res.json({ message:  `O usuário ${person.name} foi excluído!` });

        } catch (error) {
            return res.status(500).json({ error: `Houve um erro ao deletar este usuário. ${error.message}`});
        }
    }

}