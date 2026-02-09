const db = require('../db');

async function calculerCommission(parrainId) {

  // 1. Charger toutes les relations
  const [relations] = await db.query(
    'SELECT parrain_id, filleul_id FROM relations'
  );

  // 2. Charger le total des achats par client
  const [achats] = await db.query(`
    SELECT client_id, SUM(montant) AS total_achats
    FROM achats
    GROUP BY client_id
  `);

  // charger tous les clients (optionnel, mais peut être utile pour d'autres fonctionnalités)
  const [clients] = await db.query('SELECT nom FROM clients');

  // 3. Construire le graphe (liste d’adjacence)
  const graphe = {};
  relations.forEach(r => {
    if (!graphe[r.parrain_id]) {
      graphe[r.parrain_id] = [];
    }
    graphe[r.parrain_id].push(r.filleul_id);
  });

  // 4. Construire la map des achats
  const achatsMap = {};
  achats.forEach(a => {
    achatsMap[a.client_id] = a.total_achats;
  });

  // Parcours BFS
  let directs = [];
  let indirects = [];

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

      if (niveau === 1) {
        directs.push(clientId);
      } else {
        indirects.push(clientId);
      }
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
