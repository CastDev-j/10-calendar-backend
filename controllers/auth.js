const { response } = require("express");
const bcrypt = require('bcryptjs');
const User = require("../models/User");
const { generateJWT } = require("../helpers/jwt");


const loginUser = async (req, res = response) => {

    const { body } = req;

    const { email, password } = body;

    try {

        let usuario = await User.findOne({
            email
        });

        if (!usuario) {
            return returnError(res, "El correo no esta registrado");
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return returnError(res, "Password incorrecto");
        }

        const token = await generateJWT(usuario.id, usuario.name);

        return res.json({
            ok: true,
            msg: "login",
            data: {
                uid: usuario.id,
                name: usuario.name,
                token

            }
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador",
        });
    }
}

const createUser = async (req, res = response) => {

    const { body } = req;

    const { email } = body;

    try {

        let usuario = await User.findOne({
            email
        });

        if (usuario) {
            return returnError(res, "El correo ya esta registrado");
        }

        body.password = encryptPassword(body.password);

        const user = new User(body);
        await user.save();

        const token = await generateJWT(user.id, user.name);

        return res.status(201).json({
            ok: true,
            msg: "registro exitoso",
            data: {
                uid: user.id,
                name: user.name,
                token
            }
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador",
        });

    }
}

const revalidateToken = async (req, res = response) => {

    const { uid, name } = req;

    const token = await generateJWT(uid, name);

    return res.json({
        ok: true,
        msg: "renew",
        data: {
            token
        }
    });
}

const returnError = (res, msg) => {
    return res.status(400).json({
        ok: false,
        msg,
    });
}

const encryptPassword = (password) => {

    const salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt);

    return password;
}

module.exports = {
    loginUser,
    createUser,
    revalidateToken
}