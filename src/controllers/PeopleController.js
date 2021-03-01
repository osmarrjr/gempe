const People = require('../models/People');

module.exports = {

    async index (req, res) {
        try {
            let persons = await People.find();

            return res.json(persons);

        } catch (error) {
            return res.json({ error: `Houve algum erro ao solicitar a lista de usuários. ${error.message}`});
        }
    },

    async store (req, res) {
        try {
            const { name, email, phone } = req.body;

            let person = await People.findOne({ email: email});

            if(!person) {
                person = await People.create({ name, email, phone });
                return res.json({ message: `O usuário ${person.name} foi cadastrado com sucesso!`, type: 'success'});
            }

            return res.json({ message: `O usuário ${person.name} já está cadastrado!`, type: 'isRegistered' });

        } catch (error) {
            return res.json({ error: `Houve um erro ao salvar um novo usuário. ${error.message}`});
        }
    },

    async show (req, res) {
        try {
            const { id } = req.params;
            let person = await People.findById(id);

            return res.json(person);

        } catch (error) {
            return res.json({ error: `Houve um erro ao listar este usuário. ${error.message}`});
        }
    },

    async getByFilter (req, res) {
        try {
            const { q } = req.query;
            const isEmail = q.includes('@');

            if(!isEmail) {
                const peoples = await People.find({ name: new RegExp(q, 'i')});

                if(peoples.length > 0 ) {
                    return res.json(peoples);
                }
                return res.json({ message: 'Nenhum contato encontrado.', type: 'userNotIdentified'});
            }

            const peoples = await People.find({ email: new RegExp(q, 'i')});

            if(peoples.length > 0 ) {
                return res.json(peoples);
            }

            return res.json({ message: 'Nenhum contato encontrado.', type: 'userNotIdentified'});

        } catch (error) {
            return res.json({ error: `Houve um erro ao listar este usuário. ${error.message}`});
        }
    },

    async update (req, res) {
        try {
            const { id } = req.params;
            const { email } = req.body.data;
            const person = await People.findById(id);
            let existEmail;

            if(email !== person.email) {
                console.log('entrou email diferente')
                existEmail = await People.findOne({
                    email: email
                });
                console.log(existEmail)
            }
            
            if(!existEmail || existEmail === undefined) {
                await person.update({
                    ...req.body.data,
                });
    
                await person.save();
    
                return res.json({ message: `O usuário ${person.name} foi atualizado!`, type: 'success'});
            }

            return res.json({ message: `Já existe um usuário cadastrado com este e-mail.`, type: 'existUser' });
        } catch (error) {
            return res.json({ error: `Ocorreu um erro ao atualizar este usuário. ${error.message}` });
        }
    },

    async delete (req, res) {
        try {
            const { id } = req.params;
            const person = await People.findById(id);

            await person.delete();

            return res.json({ message: `O usuário ${person.name} foi excluído!`, type: 'success' });

        } catch (error) {
            return res.json({ error: `Houve um erro ao deletar este usuário.`});
        }
    }

}