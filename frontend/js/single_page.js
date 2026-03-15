const main_section = document.querySelector(".contents");
const buttons = document.querySelectorAll(".btn_active");

document.addEventListener("DOMContentLoaded", () => {

    loadPage("ajouter-achat");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {

            // gestion bouton actif
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const page = btn.dataset.page;

            loadPage(page);

        });
    });

});


function loadPage(page){

    if(page === "ajouter-achat"){

        main_section.innerHTML = `
        <section class="achats">
            <h2>
                <i class="fi fi-rr-user"></i>
                Ajouter un client
            </h2>

            <form action="/api/clients" method="post">
                <input type="text" id="clientName" name="nom" placeholder="Nom du client">
                <button type="submit">Ajouter</button>
            </form>
        </section>
        `;

    }


    else if(page === "ajouter-relation"){

        main_section.innerHTML = `
        <div class="relation">
            <form action="/api/commissions/relations" method="POST">

                <h2>Ajouter une relation</h2>

                <label>Parrain</label><br>
                <select name="parrain_id" id="clients"></select><br><br>

                <label>Filleul</label><br>
                <select name="filleul_id" id="filleulSelect"></select><br><br>

                <button type="submit">Lier les deux</button>

            </form>
        </div>
        `;

    }


    else if(page === "afficher-relations"){

        main_section.innerHTML = `
        <section class="display">

            <div class="clientsBar">
                <div>
                    <h3>Clients</h3>
                    <ul id="clientsList"></ul>
                </div>
            </div>

            <div>
                <h3>Relations</h3>
                <ul id="relationsList"></ul>
            </div>

            <div>
                <h3>Achats</h3>
                <ul id="achatsList"></ul>
            </div>

        </section>
        `;

    }


    else if(page === "afficher-details"){

        main_section.innerHTML = `
        <div class="client_list">
            <h3>Clients</h3>
            <ul id="clientsList"></ul>
        </div>

        <section class="details">

            <h2>Détails du client</h2>

            <p><strong>Client sélectionné :</strong> 
            <span id="clientNom">Aucun</span></p>

            <p>Filleuls directs : <span id="directs">-</span></p>

            <p>Filleuls indirects : <span id="indirects">-</span></p>

            <p>Total commissions : 
            <span id="commissions">0 $</span></p>

        </section>
        `;

    }


    else if(page === "voir-graphique"){

        main_section.innerHTML = `
        <section class="graph">

            <h2>Réseau graphique de parrainage</h2>

            <div id="network"
                style="width:100%; height:700px; border:1px solid #ccc;">
            </div>

        </section>
        `;

        chargerGraphe();

    }


    loadAllData();

}