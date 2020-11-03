import jwt from 'jsonwebtoken';
import config from './config';

export const getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,

    }, config.JWT_SECRET, {
        expiresIn: '48h'
    })
}

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    
    if(authorization) {
        const token = authorization.slice(7, authorization.length);
        jwt.verify(token, config.JWT_SECRET, (err, decode) => {
            if(err) {
                return res.status(401).send({ message: 'Invalid token.' });
            } else {
                req.user = decode;
                next();
            }
            
        });
    } else {
        return res.status(401).send({ message:'Token is not supplied.' });
    }
}

export const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(401).send({ msg:'Admin token is not valid.' });
}