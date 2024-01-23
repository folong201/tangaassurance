const mongose = require('mongoose')

const Assurance = new mongose.Schema({
    begin: Date,
    end: Date,
    long: Number,
    remember: Number, // default 0 , a 1 c'est le premier rappel, a 2 c'est le deuxieme rappel et a 3 c'est le dernier rappel
    state: String,
    name: String,
    type: String,
    nrbrelance: Number,
    assurance: String,
    createdAt: Date,
    updatedAt: Date,
    user: {
        type: mongose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const assu = mongose.model("Assurance", Assurance)

module.exports = assu