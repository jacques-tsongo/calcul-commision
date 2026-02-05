const { poolPromise, sql } = require('../db');

async function calculerCommission(parrainId) {
  const pool = await poolPromise;

  // 1. Charger toutes les relations
  const relationsResult = await pool.request().query(`
    SELECT parrain_id, filleul_id FROM relations
  `);

  // 2. Charger le total des achats par client
  const achatsResult = await pool.request().query(`
    SELECT client_id, SUM(montant) AS total_achats
    FROM achats
    GROUP BY client_id
  `);

  // 3. Construire le graphe (liste d’adjacence)
  const graphe = {};
  relationsResult.recordset.forEach(r => {
    if (!graphe[r.parrain_id]) {
      graphe[r.parrain_id] = [];
    }
    graphe[r.parrain_id].push(r.filleul_id);
  });

  // 4. Map des achats
  const achatsMap = {};
  achatsResult.recordset.forEach(a => {
    achatsMap[a.client_id] = a.total_achats;
  });

  // 5. BFS (comme dans le pseudo-code)
  let commissionTotale = 0;
  const visites = new Set();
  const file = [];

  file.push({ clientId: parrainId, niveau: 0 });
  visites.add(parrainId);

  while (file.length > 0) {
    const { clientId, niveau } = file.shift();

    if (niveau > 0) {
      const totalAchats = achatsMap[clientId] || 0;
      const taux = (niveau === 1) ? 0.05 : 0.01;
      commissionTotale += totalAchats * taux;
    }

    const filleuls = graphe[clientId] || [];
    for (const f of filleuls) {
      if (!visites.has(f)) {
        visites.add(f);
        file.push({ clientId: f, niveau: niveau + 1 });
      }
    }
  }

  return commissionTotale;
}

module.exports = { calculerCommission };
