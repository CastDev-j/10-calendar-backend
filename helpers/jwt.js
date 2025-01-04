const { sign, decode, verify } = require("jsonwebtoken");
const { secretJwtSeed } = require("../config/env");


const generateJWT = (uid, name) => {

    return new Promise((resolve, reject) => {
        const payload = { uid, name };

        sign(payload, secretJwtSeed, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        });
    });

}



module.exports = {
    generateJWT
}
