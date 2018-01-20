var mongoose = require("mongoose")
var Schema = mongoose.Schema

var MessageSchema = new Schema({
    message: String,
    user_1: String,
    user_2: String,
    timestamp: Date
})

module.exports = mongoose.model('Message', MessageSchema)