let main_section = document.querySelector('.contents');

document.addEventListener('DOMContentLoaded', () => {
    main_section.innerHTML =
        `
        <div class="relation">
       <form action="/api/commissions/relations" method="POST">
        <h2>Ajouter une relation</h2>

        <label>Parrain </label><br>
        <select name="parrain_id" id="clients"></select><br><br>

        <label>Filleul </label> <br>
        <select name="filleul_id" id="filleulSelect"></select> <br><br>

        <button type="submit">Lier les deux</button>
    </form>
    </div>
    `

})

function showPages(content) {

    if (content == "ajouter-relation") {
        main_section.innerHTML =
            `
          <div class="relation">
       <form action="/api/commissions/relations" method="POST">
        <h2>Ajouter une relation</h2>

        <label>Parrain </label><br>
        <select name="parrain_id" id="clients"></select><br><br>

        <label>Filleul </label> <br>
        <select name="filleul_id" id="filleulSelect"></select> <br><br>

        <button type="submit">Lier les deux</button>
    </form>
    </div>
        `
    }
    else if (content == "ajouter-achat") {
        main_section.innerHTML =
            `
         <div class="relation">
        <form action="/api/commissions/achats" method="POST">
            <h2>Ajouter un achat</h2>
            <label>Client qui achète :</label><br>
            <select name="client_id" id="buyerSelect"></select><br><br> 
            <input type="number" name="montant"
                placeholder="Montant ($)" required>
                <br><br>
            <button type="submit">Enregistrer l'achat</button>
        </form>
    </div>
        `
    }
    else if (content == "afficher-relations") {
        main_section.innerHTML =
            `
            <section class="display">
        <div>
            <h3>Clients</h3>
            <ul id="clientsList"></ul>
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
        `
    }
    else if (content == "afficher-details") {
        main_section.innerHTML =
            `
            <div>
                <h3>Clients</h3>
                <ul id="clientsList"></ul>
            </div>
            <section>
                <h2>Détails du client</h2>
                <p><strong>Client sélectionné :</strong> <span id="clientNom">Aucun</span></p>
                <p>Filleuls directs : <span id="directs">-</span></p>
                <p>Filleuls indirects : <span id="indirects">-</span></p>
                <p>Total commissions : <span id="commissions">0 $</span></p>
            </section>
        `
    }
    else if (content == "voir-graphique") {
        main_section.innerHTML =
            `
        <section>
  <h2>Réseau graphique de parrainage</h2>
  <div id="cy"
       style="width:100%; height:550px; border:1px solid #ccc;">
  </div>
</section>
        `
    }
}