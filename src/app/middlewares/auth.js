import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.js';

export default ( req, res, next ) => {
    const tokenTrue = req.headers.authorization;

    if(!tokenTrue) {
        return res.status(401).json({ error: 'token não existe' });
    }

    const token = tokenTrue.split(' ')[1];

    try {
        jwt.verify(token, authConfig.secret, function( err, decoded ){
            if(err) {
                throw new Error;
            }

            req.playerId = decoded.id;

            return next();
        })
    } catch(err) {
        return res.status(401).json({ error: 'token não existe' });
    }
}