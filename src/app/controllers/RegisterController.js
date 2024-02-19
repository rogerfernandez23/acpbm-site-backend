import { v4 } from 'uuid';
import * as Yup from 'yup';

import Clubs from '../models/Clubs.js';
import Register from '../models/Register.js';
import { send } from '../../config/nodemailer.js';

class RegisterController {
    async store( req, res ) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
            admin: Yup.boolean(),
        });

        try {
            await schema.validateSync(req.body, { abortEarly:false });
        } catch (err) {
            return res.status(400).json({ error: err.errors })
        }

        const { name, email, password, admin } = req.body;

        const emailIsUnique = await Register.findOne({
            where: { email }
        });

        if(emailIsUnique) {
            return res.status(409).json({ error: "e-mail já cadastrado"})
        }

        await Register.create({
            id: v4(),
            name,
            email,
            password,
            admin
        });

        send(email);
        
        return res.status(200).json({ sucess: "cadastro realizado com sucesso!" })
    };

    async index( req, res ) {
        const registers = await Register.findAll({
            include: [{
                model: Clubs,
                as:'club',
                attributes: [ 'club_name' ],
            }]
        });

        return res.status(200).json(registers);
    }

    async update( req, res ) {
        const schema = Yup.object().shape({
            club_id: Yup.string()
        });

        try {
            await schema.validateSync(req.body, {abortEarly: false})
        } catch (err) {
            return res.status(400).json({ error: err.errors })
        }

        const { club_id } = req.body;
        const { id } = req.params;

        const userValid = await Register.findByPk(id);

        if (!userValid) {
            return res.status(401).json({ error: 'usuário não existe'})
        }

        await Register.update({ club_id },
            { where: { id }}
        );

        return res.status(200).json({ sucess: 'dados do usuário registrados com sucesso!'})
    }
}

export default new RegisterController();