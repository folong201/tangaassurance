const mongoose = require('mongoose');
// kXWlgUaabOJEA2yJ
// mongodb + srv://folongemersonwell:<kXWlgUaabOJEA2yJ>@bestassurancecluster.apgqcji.mongodb.net/?retryWrites=true&w=majority

const uri = "mongodb+srv://folongemersonwell:kXWlgUaabOJEA2yJ@bestassurancecluster.apgqcji.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose.connect(uri)
    .then(() => {
        console.log('Connecté à la base de données MongoDB Atlas !');
    })
    .catch((error) => {
        console.error('Erreur de connexion à MongoDB Atlas :', error);
    });

module.exports = mongoose;

// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
// const { MongoClient } = require('mongodb');
// const uri = "mongodb://localhost:27017";
// const client = new MongoClient(uri, { useUnifiedTopology: true });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// }); 