const moment = require("moment");

const nameRegex = /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]{2,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

const isNameValid = (name) => {
    return nameRegex.test(name);
}

const isEmailValid = (email) => {
    return emailRegex.test(email);
}

const isPasswordValid = (password) => {
    return passwordRegex.test(password);
}

const isDate = (value) => {
    if (!value) return false;

    const date = moment(value);

    if (date.isValid()) return true;

    return false;
}

module.exports = {
    isNameValid,
    isEmailValid,
    isPasswordValid,
    isDate
}