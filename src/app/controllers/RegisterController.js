import { v4 } from 'uuid';
import * as Yup from 'yup';

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
}

export default new RegisterController();