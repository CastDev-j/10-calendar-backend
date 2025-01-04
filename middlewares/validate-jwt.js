const { response } = require("express");
const jwt = require('jsonwebtoken');
const { secretJwtSeed } = require("../config/env");

const validateJWT = (req, res = response, next) => {

    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        const payload = jwt.verify(token, secretJwtSeed);
        
        const {uid, name} = payload;

        req.uid = uid;
        req.name = name;

        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
        
    }


    next();
};


module.exports = {
    validateJWT
}