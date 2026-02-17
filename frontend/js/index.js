// Configuration de l'URL de ton API
const API_URL = "http://localhost:3100/api";

/**
 * 1. CHARGEMENT INITIAL
 * Cette fonction s'exécute au chargement de la page.
 * Elle remplit tous les menus déroulants et la liste des clients.
 */

// creation des elements <i></i> qui vont conteniles icones



async function loadAllData() {
    try {
        const response = await fetch(`${API_URL}/clients`);
        const clients = await response.json();


        // Récupération des éléments du DOM
        const selectParrain = document.getElementById("clients");
        const selectFilleul = document.getElementById("filleulSelect");
        const selectAcheteur = document.getElementById("buyerSelect");
        const ulClients = document.getElementById("clientsList");

        // Nettoyage des éléments existants
        if (selectParrain) selectParrain.innerHTML = '<option value=""> Choisir un parrain </option>';
        if (selectFilleul) selectFilleul.innerHTML = '<option value=""> Choisir un filleul </option>';
        if (selectAcheteur) selectAcheteur.innerHTML = '<option value=""> Choisir l\'acheteur </option>';
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

            // les icones qui stockent les icones
            let i_element_edit = document.createElement('i')
            let i_element_remove = document.createElement('i')
            let i_element_close = document.createElement('i')

            //affectation des icones dans leurs elements
            i_element_remove.innerHTML = "<i class='fi fi-rr-home   remove'></i>";
            i_element_close.innerHTML = "<i class='fi fi-rr-close   close'></i>";
            i_element_edit.innerHTML = "<i class='fi fi-rr-edit   edit'></i>";

            // Ajout à la liste visuelle cliquable
            // je cree un element span qui recoit les noms des clients
            let sapn = document.createElement('span')
            const li = document.createElement("li");
            sapn.textContent = `${c.nom} `
            li.className = "client-item";
            li.style.position = "relative";
            sapn.style.cursor = "pointer"
            // ajout des elements span i dans l'element li de la liste
            li.appendChild(sapn)
            li.appendChild(i_element_edit)
            li.appendChild(i_element_remove)

            //les evvenements de click
            //   1. pour aficher tous les detalis du client
            sapn.onclick = () => chargerDetailsClient(c.id, c.nom);
            //  2.  Pour modifier ( mettre a jour ) un client dans la db 
            i_element_edit.onclick = () => {

                let formUpdate = document.querySelector(".modif_client");
                formUpdate.innerHTML +=
                    `
                <h2>Modifier le client</h2>
                <form action="/api/commissions/clientsUpdate" method="post">                
                <input type="hidden" name="id" value = '${c.id}'>
                <input type="text" id="client_name" name="nom_modif" placeholder="Changer le nom du client" value = '${c.nom}'>
                <button type="submit">Modifier</button>
                </form>
                
                `
                // on affiche le formulaire
                formUpdate.classList.add("show")
                /// puis on cache la section pcple
                document.querySelector(".main").classList.add("blur")

            };

            //  3. Pour effacer un client de la db
            i_element_remove.onclick = async () => {
                if (!confirm("Voulez-vous supprimer ce client ?")) return;

                await fetch(`${API_URL}/commissions/clients/${c.id}`, {
                    method: "DELETE"
                });

                loadAllData(); // recharge la liste
            };



            if (ulClients) {
                ulClients.appendChild(li);
            }
        });

        // Charger aussi les listes de relations et d'achats pour la visualisation
        loadRelations();
        loadAchats();

    } catch (err) {
        console.error("Erreur lors du chargement des clients :", err);
    }
}

// la fonction qui charge le client a modifier


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



// pour la constructioin du graphe au format graphique

// async function chargerGraphe() {
//     const res = await fetch(`${API_URL}/commissions/graph`);
//     const data = await res.json();

//     // ===============================
//     // CONSTRUCTION DES ELEMENTS
//     // ===============================
//     const elements = [];

//     // Nœuds (clients)
//     data.clients.forEach(c => {
//         elements.push({
//             data: {
//                 id: String(c.id),
//                 label: c.nom
//             }
//         });
//     });

//     // Arêtes (relations)
//     data.relations.forEach(r => {
//         elements.push({
//             data: {
//                 id: `e${r.parrain_id}_${r.filleul_id}`,
//                 source: String(r.parrain_id),
//                 target: String(r.filleul_id)
//             }
//         });
//     });

//     // ===============================
//     // INITIALISATION CYTOSCAPE
//     // ===============================
//     const cy = cytoscape({
//         container: document.getElementById('cy'),

//         elements: elements,

//         style: [
//             {
//                 selector: 'node',
//                 style: {
//                     'label': 'data(label)',
//                     'background-color': '#1f77b4',
//                     'color': '#fff',
//                     'text-valign': 'center',
//                     'text-halign': 'center',
//                     'font-size': '12px',
//                     'width': 45,
//                     'height': 45
//                 }
//             },
//             {
//                 selector: 'edge',
//                 style: {
//                     'width': 2,
//                     'line-color': '#999',
//                     'target-arrow-color': '#999',
//                     'target-arrow-shape': 'triangle',
//                     'curve-style': 'bezier'
//                 }
//             }
//         ],

//         layout: {
//             name: 'breadthfirst',
//             directed: true,
//             padding: 30
//         },

//         userZoomingEnabled: true,
//         userPanningEnabled: true,
//         boxSelectionEnabled: true,
//         autolock: false,
//         autoungrabify: false
//     });

//     // ===============================
//     // 🔁 RESTAURATION DES POSITIONS
//     // ===============================
//     const saved = localStorage.getItem('cytoscapePositions');
//     if (saved) {
//         const positions = JSON.parse(saved);
//         cy.nodes().forEach(node => {
//             if (positions[node.id()]) {
//                 node.position(positions[node.id()]);
//             }
//         });
//     }

//     // ===============================
//     // 💾 SAUVEGARDE DES POSITIONS
//     // ===============================
//     cy.on('dragfree', 'node', () => {
//         const positions = {};
//         cy.nodes().forEach(n => {
//             positions[n.id()] = n.position();
//         });
//         localStorage.setItem(
//             'cytoscapePositions',
//             JSON.stringify(positions)
//         );
//         console.log('Positions sauvegardées');
//     });
// }




// Lancement automatique au chargement du DOM
document.addEventListener("DOMContentLoaded", () => {
    loadAllData();
    //chargerGraphe();
});

document.querySelectorAll(".navig-itmes").forEach(btn => {
    btn.addEventListener("click", () => {
        loadAllData();
        //chargerGraphe();
    })
})







