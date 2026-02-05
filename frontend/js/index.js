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


// la fonciton qui charge les clientss
const client = ["jacques","janvier","john","joel","gerant"]
const select = document.getElementById("clients")
console.log(select);


client.forEach(cl =>{
    select.innerHTML += `<option value="${cl}">${cl}</option>`
})


    console.log(select.value);

