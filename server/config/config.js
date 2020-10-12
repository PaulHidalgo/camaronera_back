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
    urlDB = urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;


/**
 * Vencimiento del token
 */
//60 seconds
//60 minutes
//24 hours
//30 days
process.env.CADUCIDAD_TOKEN = '1h';

/**
 * Seed de autenticación
 */
process.env.SEED = process.env.SEED || 'SeedDesarrollo';