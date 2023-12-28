const Assurance = require('../models/Assurance.js');
const User = require('../models/User.js');
const moment = require('moment');
const https = require('https');

exports.relance = async () => {
    console.log("Relance function called");
    try {
        const assurances = await Assurance.find();
        const oneWeekFromNow = moment().add(1, 'week');

        const assurancesExpiringSoon = assurances.filter(assurance =>
            moment(assurance.end).isSameOrBefore(oneWeekFromNow)
        );

        for (let assurance of assurancesExpiringSoon) {
            const user = await User.findById(assurance.user);
            // Send a message to the user
            console.log(`Sending message to user ${user.name} about expiring assurance.`);
            sendSMS(user.phone, `Dear ${user.name}, your assurance is expiring soon.`);
        }

    } catch (err) {
        console.error(err);
    }
}

function sendSMS(phoneNumber, message) {
    let username = 'folong201';
    let password = "aY6Dj5Fdx4gHRK:";

    let postData = JSON.stringify({
        // 'to': [phoneNumber],
        // 'to': ['+237' + phoneNumber],
        'to': ['+237' + "683836629"],
        'body': message
    });

    let options = {
        hostname: 'api.bulksms.com',
        port: 443,
        path: '/v1/messages',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': postData.length,
            'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
        }
    };
    console.log("envoie du message");
    let req = https.request(options, (resp) => {
        console.log('statusCode:', resp.statusCode);
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            console.log("Response:", data);
        });
    });

    req.on('error', (e) => {
        console.log(e);
       console.log(e);
    });

    req.write(postData);
    req.end();
}