const express = require('express');
const router = express.Router();
const db = require('../db'); // On utilise ton fichier db.js MySQL
const { calculerCommission } = require('../services/commissionServices');

// la route pour récupérer les relations (parrain-filleul) et les achats (client, montant)
router.get('/relations', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        p.nom AS parrain,
        f.nom AS filleul
      FROM relations r
      JOIN clients p ON r.parrain_id = p.id
      JOIN clients f ON r.filleul_id = f.id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// GET /api/commissions/achats
router.get('/achats', async (req, res) => {
  try {
    const [rows] = await db.query(`
            SELECT c.nom AS client, a.montant
            FROM achats a
            JOIN clients c ON a.client_id = c.id
        `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Route pour ajouter une relation (Correction MySQL)
router.post("/relations", async (req, res) => {
  const { parrain_id, filleul_id } = req.body;
  try {
    await db.query("INSERT INTO relations (parrain_id, filleul_id) VALUES (?, ?)", [parrain_id, filleul_id]);

    // rediriger vers la page d'accueil pour voir les changements (optionnel, surtout si tu utilises fetch côté client)
    res.redirect('/');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Route pour ajouter un achat (Correction MySQL)
router.post("/achats", async (req, res) => {
  const { client_id, montant } = req.body;
  try {
    await db.query("INSERT INTO achats (client_id, montant, date_achat) VALUES (?, ?, NOW())", [client_id, montant]);
    res.json({ message: "Achat ajouté" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Récupérer aussi les noms des directs/indirects pour le front
router.get('/:parrainId', async (req, res) => {
  try {
    const parrainId = parseInt(req.params.parrainId);
    if (isNaN(parrainId)) {
      return res.status(400).json({ error: "ID invalide" });
    }

    const result = await calculerCommission(parrainId);

    const [directs] = await db.query(`
      SELECT c.nom
      FROM relations r
      JOIN clients c ON r.filleul_id = c.id
      WHERE r.parrain_id = ?
    `, [parrainId]);


    res.json({
      parrainId,
      commission_totale: result.commissionTotale.toFixed(2),
      directs: result.directs,
      indirects: result.indirects
    });


  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});






module.exports = router;