const express = require('express');
const router = express.Router();
const db = require('../db');

// GET tous les clients
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, nom FROM clients');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Dans backend/routes/clients.js
router.post('/', async (req, res) => {
    try {
        const { nom } = req.body;
        // Utilisation de MySQL (db.query) et non mssql
        await db.query('INSERT INTO clients (nom) VALUES (?)', [nom]);
        
        // Rediriger vers l'accueil après l'ajout pour voir le résultat
        res.redirect('/'); 
    } catch (err) {
        res.status(500).send("Erreur lors de l'ajout : " + err.message);
    }
});

module.exports = router;
