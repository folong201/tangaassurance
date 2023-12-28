// Importer le modèle d'utilisateur
const User = require('../models/user');
const bcrypt = require('bcrypt'); 
require('dotenv').config();

// Créer un utilisateur
const createUser = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        var user = req.body
        user.password = hashedPassword
        const newUser = new User(user);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message ,ok:'false'});
    }
};

// Obtenir tous les utilisateurs
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message,ok:'false' });
    }
};

// Obtenir un utilisateur par son ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' ,ok:'false'});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message ,ok:'false'});
    }
};

// Mettre à jour un utilisateur
const updateUser = async (req, res) => {
    try {
        //verifier si le mot de passe et null ou pas
        var user = req.body

        if (user.password != '') {
            //hacher le  mot de passe
            const salt = await bcrypt.genSalt(10);  
            const hashedPassword = await bcrypt.hash(user.password, salt);
            user.password = hashedPassword;
            //metre l'utilisateur a jour en modifiant le mot de passe
            const updatedUser = await User.findByIdAndUpdate(req.params.id, user, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: 'Utilisateur non trouvé',ok:'false' });
            }
            res.status(200).json({ user: updatedUser ,ok:'true'});
        }else{
            //metre l'utilisateur a jour en ne modifiant pas le mot de passe
            // const user1 = await User.findById(req.params.id);
            // user1.name = req.body.name;
            // user1.email = req.body.email;
            // user1.phone = req.body.phone;
            // user1.role = req.body.role;
            // user1.save();
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: 'Utilisateur non trouvé',ok:'false' });
            }else{
                res.status(200).json({ message: 'Utilisateur modifié avec succès', user: updatedUser,ok:'true'},);
            }

        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un utilisateur
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé',ok:'false' });
        }
        res.status(200).json({ message: 'Utilisateur supprimé avec succès',ok:'true' });
    } catch (error) {
        res.status(500).json({ error: error.message ,ok:'false'});
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
