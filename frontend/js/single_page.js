let main_section = document.querySelector('.main_section');

const navigation = document.querySelectorAll('.navig-itmes');
console.log(navigation);

// remplir la section principale par defaut

// main_section.innerHTML = `
//     <section>
//         <form action="/api/clients" method="post">
//             <h2>Ajouter un client</h2>
//             <input type="text" id="clientName" name="nom" placeholder="Nom du client">
//             <button type="submit">Ajouter</button>
//         </form>
//     </section>
// `;


let target = '';
navigation.forEach(btn => {
    btn.addEventListener('click', (e) => {
        target = e.target.getAttribute('href').substring(1);
        console.log(target);

       
    });
});