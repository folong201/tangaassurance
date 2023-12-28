const mongose = require('mongoose')

const Assurance = new mongose.Schema({
    begin: Date,
    end: Date,
    long: Number,
    remember: Number,
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