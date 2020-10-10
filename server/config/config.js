/**
 * Puerto
 */
process.env.PORT = process.env.PORT || 3000;

/**
 * Entorno
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/**
 * Database
 */
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/camaronera';
} else {
    urlDB = 'mongodb+srv://admin:admin@cluster0.hqswy.mongodb.net/camaronera'
        //urlDB = process.env.MONGO_URI;
}

//PROD  --------   mongodb+srv://admin:admin@cluster0.hqswy.mongodb.net/camaronera

process.env.URLDB = urlDB;