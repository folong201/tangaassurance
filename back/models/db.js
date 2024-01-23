const mongoose = require('mongoose');
// kXWlgUaabOJEA2yJ
const uri = "mongodb+srv://folongemersonwell:kXWlgUaabOJEA2yJ@bestassurancecluster.apgqcji.mongodb.net/?retryWrites=true&w=majority";

// const uri = "mongodb+srv://folongemersonwell:kXWlgUaabOJEA2yJ@bestassurancecluster.apgqcji.mongodb.net/prod?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose.connect(uri)
    .then(() => {
        console.log('Connecté à la base de données MongoDB Atlas !');
    })
    .catch((error) => {
        console.error('Erreur de connexion à MongoDB Atlas :', error);
    });

module.exports = mongoose;
