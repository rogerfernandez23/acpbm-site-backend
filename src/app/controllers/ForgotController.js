const { v4 } = require('uuid');
const Yup = require('yup');
const crypto = require('crypto');
const { Op, literal } = require('sequelize');

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

        const token = crypto.randomBytes(3).toString('hex').toUpperCase();
        console.log(`Token gerado: ${token}`);

        await Forgot.create({
            id: v4(),
            email,
            token
        });

        sendRecovery(email, token);

        return res.status(200).json({ sucess: "E-mail enviado com sucesso!"})
    };

    async update(req, res) {
        const schema = Yup.object().shape({
            token: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
        });

        try {
            await schema.validateSync(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ error: err.errors })
        }

        const { token, email, password } = req.body;

        const verifyEmail = await Forgot.findOne({
            where: { email },
        })

        if (!verifyEmail) {
            return res.status(403).json({ error: "Este e-mail não solicitou uma redefinição de senha!"})
        }

        const tokenTime = literal('NOW() - INTERVAL \'2 hours\'');

        const verifyToken = await Forgot.findOne({
            where: { token },
        })

        if (!verifyToken) {
            return res.status(401).json({ error: "Token inválido ou expirado! Tente novamente"})
        }

        const dateToken = await Forgot.findOne({
            where: { 
                token,
                createdAt: { [Op.lt]: tokenTime } 
            },
            attributes: ['createdAt']
        });

        if (dateToken) {
            return res.status(401).json({ error: "Token inválido ou expirado! Tente novamente"})
        }

        const register = await Register.findOne({ where: { email } });

        register.password = password;

        await register.save();

        return res.status(200).json({ success: 'Senha alterada com sucesso!' })
    }
}

module.exports = new ForgotController();
