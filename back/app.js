const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const router = require('./routes/index.js');
const relancer = require('./services/Relance.js');

const corsOptions = {
    origin: "*",
}; 
app.use(cors(corsOptions)); // Use cors with the options
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router); 
const db = require("./models/db.js");
//appeller la fonction relance aores tout les 12heure*2
setInterval(relancer.relance, 43200000*2);
// setInterval(relancer.relance, 6000);

module.exports = app;