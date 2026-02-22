const mainSection = document.querySelector('.content-area');
const buttons = document.querySelectorAll('.sidebar button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const page = button.getAttribute('data-page');
        loadPage(page);
    });
});

// function loadPage(page) {


// }

// loadPage();

//active button
buttons.forEach(button => {
    button.addEventListener('click', () => {

        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const page = button.getAttribute('data-page');
        loadPage(page);
    });
});


function loadPage(page) {

    mainSection.classList.add('fade-out');

    setTimeout(() => {

        renderPage(page);

        mainSection.classList.remove('fade-out');
        mainSection.classList.add('fade-in');

    }, 300);
}


function renderPage(page) {

    switch (page) {

        case 'ajouter-relation':
            mainSection.innerHTML = `
                <div class="card">
                    <h2>Ajouter une relation</h2>
                    <form action="/api/commissions/relations" method="POST">
                        <label>Parrain</label>
                        <select name="parrain_id" id="clients"></select>

                        <label>Filleul</label>
                        <select name="filleul_id" id="filleulSelect"></select>

                        <button type="submit">Lier</button>
                    </form>
                </div>
            `;
            break;

        case 'ajouter-achat':
            mainSection.innerHTML = `
                <div class="card">
                    <h2>Ajouter un achat</h2>
                    <form action="/api/achats" method="POST">
                        <label>Client</label>
                        <select name="client_id" id="clients"></select>

                        <label>Montant</label>
                        <input type="number" name="montant" required>

                        <button type="submit">Ajouter</button>
                    </form>
                </div>
            `;
            break;

        case 'afficher-relations':
            mainSection.innerHTML = `
                <div class="card">
                    <h2>Liste des relations</h2>
                    <div id="relationsList"></div>
                </div>
            `;
            break;

        case 'afficher-details':
            mainSection.innerHTML = `
                <div class="card">
                    <h2>Détails d’un client</h2>
                    <select id="clientDetailSelect"></select>
                    <div id="clientDetails"></div>
                </div>
            `;
            break;

        case 'voir-graphique':
            mainSection.innerHTML = `
                <div class="card">
                    <h2>Réseau graphique</h2>
                    <div id="network"></div>
                </div>
            `;
            loadGraph(); // important
            break;

        default:
            mainSection.innerHTML = `
                <div class="card">
                    <h2>Ajouter un client</h2>
                    <form action="/api/clients" method="post">
                        <input type="text" name="nom" placeholder="Nom du client" required>
                        <button type="submit">Ajouter</button>
                    </form>
                </div>
            `;
    }

    setTimeout(() => {
        document.getElementById('loader').style.display = "none";
        loadGraph();
    }, 1000);
}
