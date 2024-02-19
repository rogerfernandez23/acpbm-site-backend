import * as Yup from 'yup';
import Register from '../models/Register.js';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.js';
class LoginController {
    async store( req, res ) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        });

        const errorLogin = () => {
            return res
            .status(401)
            .json({ error: 'e-mail ou senha incorreto!'})
        };

        if (!(await schema.isValid(req.body))) {
            return errorLogin();
        }

        const { email, password } = req.body;

        const player = await Register.findOne({
            where: { email },
        })

        if(!player) {
            return errorLogin();
        };

        if(!(await player.checkPassword(password))) {
            return errorLogin();
        } 

        return res.json({ 
            id: player.id,
            name: player.name,
            email: player.email,
            admin: player.admin,
            club_id: player.club_id,
            token: jwt.sign({ id: player.id, name: player.name }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            })
        });
    };
};

export default new LoginController();