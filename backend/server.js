const express = require('express');
const cors = require('cors');
const path = require('path');
const commissionRoutes = require('./routes/commissions');
const clientRoutes = require('./routes/clients');


const app = express();
app.use(cors());
app.use(express.json());

//definir le moteur d'affichage
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend'));


//je configure l'acces aux fichiers statiques
app.use(express.static(path.join(__dirname, '../frontend')));

app.use(express.urlencoded({ extended: true }));

app.use('/api/commissions', commissionRoutes);
app.use('/api/clients', clientRoutes);

// enovie de la premiere route de la page acceuil
app.get('/', (req, res) => {
  res.status(200).render('index');
});



//le port d'ecoute du serveur
const PORT = 3100;

app.listen(PORT, () => {
  console.log(` Serveur lancé sur http://localhost:${PORT}`);
});
