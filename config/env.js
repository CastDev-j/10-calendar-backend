require('dotenv').config();


const appPort = process.env.PORT || 6969;
const dbCnn = process.env.DB_CNN;
const secretJwtSeed = process.env.SECRET_JWT_SEED;

module.exports = {
    appPort,
    dbCnn,
    secretJwtSeed
}