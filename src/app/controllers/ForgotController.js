const { v4 } = require('uuid');
const Yup = require('yup');
const crypto = require('crypto');

const { sendRecovery } = require('../../config/sendRecovery.js');
const Register = require('../models/Register');
const Forgot = require('../models/Forgot');

class ForgotController {
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
        }); 

        try {
            await schema.validateSync(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ error: err.errors })
        }
    
        const { email } = req.body;

        const verifyEmail = await Register.findOne({
            where: { email },
        })

        if(!verifyEmail) {
            return res.status(401).json({ error: 'e-mail não cadastrado!'})
        }

        const token = crypto.randomBytes(6).toString('hex');

        await Forgot.create({
            id: v4(),
            email,
            token
        });

        sendRecovery(email, token);

        return res.status(200).json({ sucess: "E-mail enviado com sucesso!"})
    };
}

module.exports = new ForgotController();
