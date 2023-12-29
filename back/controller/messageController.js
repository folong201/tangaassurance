// Importer le modèle de message
const Message = require('../models/Message');
const moment = require('moment')

// Créer un message
const createMessage = async (req, res) => {
    try {
        const message1 = req.body;
        message1.date = moment.now()
        message1.status = "0"
        const message = new Message(req.body);
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lire tous les messages
const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lire un message par son ID
const getMessageById = async (req, res) => {
    try {
        const { id } = req.params;
        const message = await Message.findById(id);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour un message par son ID
const updateMessageById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMessage = await Message.findById(
            id
        );
        updatedMessage.status = 1
        updatedMessage.save()
        if (!updatedMessage) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.status(200).json(updatedMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un message par son ID
const deleteMessageById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMessage = await Message.findByIdAndDelete(id);
        if (!deletedMessage) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createMessage,
    getAllMessages,
    getMessageById,
    updateMessageById,
    deleteMessageById,
};
