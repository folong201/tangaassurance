const nodemailer = require("nodemailer");
const Assurance = require('../models/Assurance');
const Users = require("../models/User");


const calculateOneWeekLater = (date) => {
    const oneWeekLaterDate = new Date(date);
    oneWeekLaterDate.setDate(oneWeekLaterDate.getDate() + 7);
    return oneWeekLaterDate;
};

const isDateEqual = (date1, date2) => {
    return date1.toISOString() === date2.toISOString();
};

const isDateBefore = (date1, date2) => {
    return date1 < date2;
};

exports.relance = async () => {
    console.log("Début de la relance");
    try {
        const currentDate = new Date();
        const todayISOString = currentDate.toISOString();

        // Calcul de la date dans une semaine
        const oneWeekLaterDate = calculateOneWeekLater(currentDate);
        const oneWeekLaterISOString = oneWeekLaterDate.toISOString();

        // Recherche des assurances
        const assurances = await Assurance.find({
            $or: [
                { end: oneWeekLaterISOString }, // Expire dans une semaine
                { end: todayISOString },        // Expire aujourd'hui
                { end: { $lt: todayISOString } }, // A déjà expiré (il y a une semaine ou plus tôt)
            ],
        }).exec();

        for (const assurance of assurances) {
            const user = await Users.findById(assurance.user).exec();
            if (user) {

                if (isDateEqual(new Date(assurance.end), oneWeekLaterDate)) {
                    if (assurance.remember == 3) {
                        log("Assurance déjà relancée 7 jours plus tard");
                    } else {
                        console.log(`Envoi d'e-mail après l'expiration pour l'assurance ${assurance._id} ${assurance.name}`);
                        await SendEmail(user, assurance, "after");
                        await updateAssurance(assurance, "expired", remember = 3);
                    }

                } else if (isDateEqual(new Date(assurance.end), currentDate)) {
                    if (assurance.remember == 1) {
                        console.log("Assurance déjà relancée aujourd'hui");
                    } else {
                        console.log(`Envoi d'e-mail le jour de l'expiration pour l'assurance ${assurance._id} ${assurance.name}`);
                        await SendEmail(user, assurance, "on");
                        await updateAssurance(assurance, "expired", 2);
                    }
                } else if (isDateBefore(new Date(assurance.end), currentDate)) {
                    if (assurance.remember == 2) {
                        console.log("Assurance déjà relancée il y a une semaine");

                    } else {
                        console.log(`Envoi d'e-mail avant l'expiration pour l'assurance ${assurance._id} ${assurance.name}`);
                        await SendEmail(user, assurance, "before");
                        await updateAssurance(assurance, 'active', 1);
                    }
                } else {
                    console.log(`L'assurance ${assurance._id} ${assurance.name} n'a pas besoin d'être relancée`);
                }
            }
        }
    } catch (error) {
        console.log("Erreur lors de la relance");
        console.log(error.message);
        console.log(error);
    }
};

const updateAssurance = async (assurance, state, remember) => {
    console.log("Mise à jour de l'assurance");
    try {
        await Assurance.updateOne({ _id: assurance._id }, { state: state, nrbrelance: assurance.nrbrelance + 1, remember: remember }).exec();
        console.log(`Assurance ${assurance._id} mise à jour avec le nouvel état ${state}`);
    } catch (error) {
        console.log(`Erreur lors de la mise à jour de l'assurance ${assurance._id}`);
        console.log(error.message);
    }
};

exports.updateAssurance = updateAssurance;

const SendEmail = async (user, assurance, type) => {
    console.log("Sending email");
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "bestassurancecontact@gmail.com",
                pass: "ddnisgtetdfioatz",
            },
        });

        let subject = "";
        let text = "";
        let html = "";

        if (type === "before") {
            subject = "Rappel d'assurance - Expiration imminente";
            text = `Bonjour ${user.username},\n\nVotre assurance ${assurance.name} va bientôt expirer(7 jours). Veuillez contacter votre agent d'assurance pour la renouveler dans les plus brefs délais.\n\nNous vous remercions pour votre confiance.\n\nCordialement,\nL'équipe Best Assurance`;
            html = `<p>Bonjour ${user.username},</p><br><p>Votre assurance ${assurance.name} va bientôt expirer. Veuillez contacter votre agent d'assurance pour la renouveler dans les plus brefs délais.</p><br><p>Nous vous remercions pour votre confiance.</p><br><p>Cordialement,</p><p>L'équipe Best Assurance</p>`;
        } else if (type === "on") {
            subject = "Rappel d'assurance - Expiration aujourd'hui";
            text = `Bonjour ${user.name},\n\nVotre assurance ${assurance.name} expire aujourd'hui. Veuillez contacter votre agent d'assurance pour la renouveler dès que possible.\n\nNous vous remercions pour votre confiance.\n\nCordialement,\nL'équipe Best Assurance`;
            html = `<p>Bonjour ${user.name},</p><br><p>Votre assurance ${assurance.name} expire aujourd'hui. Veuillez contacter votre agent d'assurance pour la renouveler dès que possible.</p><br><p>Nous vous remercions pour votre confiance.</p><br><p>Cordialement,</p><p>L'équipe Best Assurance</p>`;
        } else if (type === "after") {
            subject = "Rappel d'assurance - Expiration dépassée";
            text = `Bonjour ${user.name},\n\nVotre assurance ${assurance.name} a expiré il y'a une semaine de cela. Veuillez contacter votre agent d'assurance pour la renouveler au plus vite.\n\nNous vous remercions pour votre confiance.\n\nCordialement,\nL'équipe Best Assurance`;
            html = `<p>Bonjour ${user.name},</p><br><p>Votre assurance ${assurance.name} a expiré. Veuillez contacter votre agent d'assurance pour la renouveler au plus vite.</p><br><p>Nous vous remercions pour votre confiance.</p><br><p>Cordialement,</p><p>L'équipe Best Assurance</p>`;
        }

        let mailOptions = {
            from: "bestassurancecontact@gmail.com",
            to: `${user.email}`,
            subject: subject,
            text: text,
            html: html,
        };

        await transporter.sendMail(mailOptions); // Await the sendMail function
        console.log("Email sent");
    } catch (error) {
        console.log(error.message);
    }
};
