const Assurance = require('../models/Assurance'); // Adjust the path according to your project structure

exports.createAssurance = async (req, res, next) => {
    try {
        const assurance = new Assurance({
            begin: req.body.begin,
            end: req.body.end,
            long: req.body.long,
            remember: req.body.remember || 0,
            state: req.body.state || "active",
            name: req.body.name || "none",
            type: req.body.type || "none",
            nrbrelance: req.body.nrbrelance || 0,
            assurance: req.body.assurance || "none",
            createdAt: new Date(),
            updatedAt: new Date(),
            user: req.body.user
        });
        const savedAssurance = await assurance.save();
        res.status(201).json({ok: 'true', message: 'Assurance created', assurance: savedAssurance});
    } catch (error) {
        res.status(500).json({ error: error.message, ok: 'false' });
    }
};

exports.getAllAssurances = async (req, res, next) => {
    try {
        const assurances = await Assurance.find();
        res.status(200).json(assurances);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAssuranceById = async (req, res, next) => {
    try {
        const assurance = await Assurance.findById(req.params.id);
        if (!assurance) {
            return res.status(404).json({ error: 'Assurance not found' });
        }
        res.status(200).json(assurance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateAssurance = async (req, res, next) => {
    try {
        const assurance = await Assurance.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!assurance) {
            return res.status(404).json({ error: 'Assurance not found' });
        }
        res.status(200).json(assurance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAssurance = async (req, res, next) => {
    try {
        const assurance = await Assurance.findByIdAndDelete(req.params.id);
        if (!assurance) {
            return res.status(404).json({ error: 'Assurance not found' });
        }
        res.status(200).json({ message: 'Assurance deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAssuranceByUser = async (req, res, next) => {
    try {
        const assurances = await Assurance.find({user: req.params.id});
        if (!assurances) {
            return res.status(404).json({ error: 'Assurance not found' ,ok: 'false' });
        }else{
            res.status(200).json({ok: 'true', message: 'Assurance found', assurances: assurances});
        }
    } catch (error) {
        res.status(500).json({ error: error.message, ok: 'false' });
    }
}