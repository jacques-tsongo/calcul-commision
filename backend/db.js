const mysql = require('mysql2');

// On crée un "pool" de connexions (plus performant qu'une connexion unique)
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',     // Utilisateur par défaut de XAMPP
    password: '',     // Mot de passe vide par défaut sur XAMPP
    database: 'ReseauMarketing_DDB', // Le nom de ta base sur phpMyAdmin
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// On transforme le pool pour utiliser les Promises (async/await)
const promisePool = pool.promise();

// Petit test de connexion au démarrage
async function testConnection() {
    try {
        const [rows] = await promisePool.query('SELECT 1 + 1 AS result');
        console.log(' Connecté à MySQL via phpMyAdmin !');
    } catch (err) {
        console.error(' Erreur de connexion MySQL :', err.message);
    }
}

testConnection();

module.exports = promisePool;