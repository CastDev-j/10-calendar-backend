const mongoose = require('mongoose');
const { dbCnn } = require('../config/env');


const dbConnection = async () => {
    try {
        await mongoose.connect(dbCnn);
        
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver logs');
    }
}

module.exports = {
    dbConnection
}