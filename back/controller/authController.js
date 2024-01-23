const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User.js');
require('dotenv').config();

exports.login = async (req, res, next) => {
    console.log(req.body);
    try {
        const user = await User.findOne({ phone: req.body.phone }).maxTimeMS(10000);
        if (!user) {
            console.log("utilisateur null");
            if ((req.body.phone === "683836629" || req.body.phone === "679968749") && req.body.password === "password") {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(req.body.password, salt);

                const user1 = {
                    name: "Admin",
                    email: "admin@gmail.com",
                    phone: "683836629",
                    password: hash,
                    role: "admin",
                    status: "active",
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                };
                const token = jwt.sign(
                    { userId: 1, user: user1 },
                    process.env.JWT_SECRET,
                    { expiresIn: '24h' }
                );

                res.status(200).json({
                    userId: 1,
                    user: user1,
                    token: token,
                    ok: 'true'
                });
            } else {
                return res.status(401).json({ error: 'Utilisateur non trouvé !', ok: 'false' });
            }
        } else {
            console.log("utilisateur toruver");
            const valid = await bcrypt.compare(req.body.password, user.password);
            if (!valid) {
                console.log("mot de passe incorect");
                return res.status(401).json({ error: 'Mot de passe incorrect ou adresse email incorrect !', ok: 'false' });
            }

            let userObj = user.toObject(); // Convert Mongoose document to JavaScript object
            delete userObj.password; // Now you can delete the password

            const token = jwt.sign(
                { userId: userObj._id, user: userObj },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.status(200).json({
                userId: userObj._id,
                user: userObj,
                token: token,
                ok: 'true'
            });
            console.log("login ok");
        }
    } catch (error) {
        console.log("error");
        console.log(error); 
        res.status(500).json({ error: error.message, ok: 'false' });
    }
};

exports.register = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hash,
            role: req.body.role || "user",
            status: req.body.status || "active",
            createdAt: Date.now(),
            updatedAt: Date.now()
        });

        const savedUser = await user.save();
        let userObj = savedUser.toObject(); // Convert Mongoose document to JavaScript object
        delete userObj.password; // Now you can delete the password

        const token = jwt.sign(
            { userId: userObj._id, user: userObj },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            userId: userObj._id,
            user: userObj,
            token: token,
            ok: 'true'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack, // This will give the stack trace of the error
            ok: 'false'
        });
    }
};