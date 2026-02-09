// Configuration de l'URL de ton API
const API_URL = "http://localhost:3100/api";

/**
 * 1. CHARGEMENT INITIAL
 * Cette fonction s'exécute au chargement de la page.
 * Elle remplit tous les menus déroulants et la liste des clients.
 */
async function loadAllData() {
    try {
        const response = await fetch(`${API_URL}/clients`);
        const clients = await response.json();
        console.log(clients);


        // Récupération des éléments du DOM
        const selectParrain = document.getElementById("clients");
        const selectFilleul = document.getElementById("filleulSelect");
        const selectAcheteur = document.getElementById("buyerSelect");
        const ulClients = document.getElementById("clientsList");

        // Nettoyage des éléments existants
        if (selectParrain) selectParrain.innerHTML = '<option value="">-- Choisir un parrain --</option>';
        if (selectFilleul) selectFilleul.innerHTML = '<option value="">-- Choisir un filleul --</option>';
        if (selectAcheteur) selectAcheteur.innerHTML = '<option value="">-- Choisir l\'acheteur --</option>';
        if (ulClients) ulClients.innerHTML = "";

        clients.forEach(c => {
            // Création des options pour les menus déroulants (Select)
            // L'ID est mis dans la "value", le NOM est le texte visible
            const createOption = () => {
                const opt = document.createElement("option");
                opt.value = c.id;
                opt.textContent = c.nom;
                return opt;
            };

            if (selectParrain) selectParrain.appendChild(createOption());
            if (selectFilleul) selectFilleul.appendChild(createOption());
            if (selectAcheteur) selectAcheteur.appendChild(createOption());

            // Ajout à la liste visuelle cliquable
            const li = document.createElement("li");
            li.textContent = c.nom;
            li.style.cursor = "pointer";
            li.className = "client-item";
            li.onclick = () => chargerDetailsClient(c.id, c.nom);
            if (ulClients) ulClients.appendChild(li);
        });

        // Charger aussi les listes de relations et d'achats pour la visualisation
        loadRelations();
        loadAchats();

    } catch (err) {
        console.error("Erreur lors du chargement des clients :", err);
    }
}

/**
 * 2. CHARGER LES DÉTAILS D'UN CLIENT (Commissions et Filleuls)
 */
async function chargerDetailsClient(id, nom) {
    try {
        const response = await fetch(`${API_URL}/commissions/${id}`);
        const data = await response.json();
        console.log(data);


        // Mise à jour de l'interface
        document.getElementById('clientNom').textContent = nom;

        // Affichage des filleuls directs (si le tableau est vide, afficher 'Aucun')
        const directsText = (data.directs && data.directs.length > 0)
            ? data.directs.join(', ')
            : 'Aucun';
        document.getElementById('directs').textContent = directsText;

        // Affichage du total des commissions
        document.getElementById('commissions').textContent = data.commission_totale + ' $';

        // Note: Pour les indirects, si ton backend ne les renvoie pas encore, 
        // tu peux laisser un '-' ou adapter ton calcul BFS

        const indirectsText =
            Array.isArray(data.indirects) && data.indirects.length > 0
                ? data.indirects.join(', ')
                : 'Aucun';

        document.getElementById('indirects').textContent = indirectsText;



    } catch (err) {
        console.error("Erreur lors de la récupération des détails :", err);
        alert("Erreur lors du calcul des commissions.");
    }
}

/**
 * 3. CHARGER LA LISTE DES RELATIONS
 */
async function loadRelations() {
    try {
        const res = await fetch(`${API_URL}/commissions/relations`); // Vérifie que cette route existe
        if (!res.ok) return;
        const data = await res.json();
        const ul = document.getElementById("relationsList");
        if (ul) {
            ul.innerHTML = "";
            data.forEach(R => {
                const li = document.createElement("li");
                li.textContent = `${R.parrain} → ${R.filleul}`;
                ul.appendChild(li);
            });
        }
    } catch (e) { console.log("Pas encore de relations à afficher"); }
}

/**
 * 4. CHARGER LA LISTE DES ACHATS
 */
async function loadAchats() {
    try {
        const res = await fetch(`${API_URL}/commissions/achats`); // Vérifie que cette route existe
        if (!res.ok) return;
        const data = await res.json();
        const ul = document.getElementById("achatsList");
        if (ul) {
            ul.innerHTML = "";
            data.forEach(a => {
                const li = document.createElement("li");
                li.textContent = `${a.client} : ${a.montant} $`;
                ul.appendChild(li);
            });
        }
    } catch (e) { console.log("Pas encore d'achats à afficher"); }
}

// Lancement automatique au chargement du DOM
document.addEventListener("DOMContentLoaded", loadAllData);