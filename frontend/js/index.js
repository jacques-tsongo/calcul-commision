// Données temporaires (front uniquement)
let clients = [];
let relations = [];
let achats = [];

// Ajouter un client
function addClient() {
    const name = clientName.value.trim();
    if (name === "") return;

    clients.push(name);
    renderClients();
    clientName.value = "";
}

// Ajouter une relation
function addRelation() {
    const p = parrain.value.trim();
    const f = filleul.value.trim();

    relations.push(`${p} → ${f}`);
    renderRelations();
}

// Ajouter un achat
function addAchat() {
    const b = buyer.value.trim();
    const a = amount.value;

    achats.push(`${b} : ${a} $`);
    renderAchats();
}

// Affichage
function renderClients() {
    clientsList.innerHTML = "";
    clients.forEach(c => {
        const li = document.createElement("li");
        li.textContent = c;
        li.onclick = () => selectClient(c);
        clientsList.appendChild(li);
    });
}

function renderRelations() {
    relationsList.innerHTML = "";
    relations.forEach(r => {
        const li = document.createElement("li");
        li.textContent = r;
        relationsList.appendChild(li);
    });
}

function renderAchats() {
    achatsList.innerHTML = "";
    achats.forEach(a => {
        const li = document.createElement("li");
        li.textContent = a;
        achatsList.appendChild(li);
    });
}

// Sélection client (placeholder)
function selectClient(name) {
    selectedClient.textContent = name;
    directs.textContent = "À calculer";
    indirects.textContent = "À calculer";
    commissions.textContent = "0 $";
}


// la fonciton qui charge les clients
const client = ["Alice","Bob","Charlie","David","Emma","Frank","Grace","Henry"]
const select = document.getElementById("clients")

client.forEach(cl =>{
    select.innerHTML += `<option value="${cl}">${cl}</option>`
})


// appel du back dans le front pour calculer les commissions

async function chargerCommission(clientId, nomClient) {
  const response = await fetch(`/api/commissions/${clientId}`);
  const data = await response.json();

  console.log(data); // tu l'as déjà vu → ça marche

  afficherDetailsClient(nomClient, data);
}
 // on injecte les donneses du client dans la section details du client

 function afficherDetailsClient(nomClient, data) {
  document.getElementById('clientNom').textContent = nomClient;

  // Pour l’instant valeurs de test
  document.getElementById('directs').textContent = data.directs ?? '—';
  document.getElementById('indirects').textContent = data.indirects ?? '—';

  document.getElementById('commissions').textContent =
    data.commission_totale + ' $';
}
 // savoir quel client est selectionne et appeler la fonction chargerCommission

 select.addEventListener('change', (e) => {
  const clientId = e.target.value;
  const nomClient = e.target.options[e.target.selectedIndex].text;

  chargerCommission(clientId, nomClient);
});
