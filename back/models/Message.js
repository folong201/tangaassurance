const mongose = require('mongoose')

const messageSchema = new mongose.Schema({
    date: Date,
    status: String,
    content: String,
    createdAt: Date,
    updatedAt: Date,
    phone: Number,
    email: String,
    user: {
        type: mongose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const Message = mongose.model("Message", messageSchema)

module.exports = Message