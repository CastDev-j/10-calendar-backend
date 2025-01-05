require('dotenv').config();


const appPort = process.env.PORT || "6969";
const dbCnn = process.env.DB_CNN || "mongodb+srv://castdev:jugar2017%40CJ@cluster0.w9bfa.mongodb.net/mern_calendar" ;
const secretJwtSeed = process.env.SECRET_JWT_SEED || "cepillin eres un naco y un estupido";

module.exports = {
    appPort,
    dbCnn,
    secretJwtSeed
}