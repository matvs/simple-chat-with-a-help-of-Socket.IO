var mongoose = require("mongoose")
var Schema = mongoose.Schema

var MessageSchema = new Schema({
    text: String,
    from: String,
    to: String,
    timestamp: Date
})

module.exports = mongoose.model('Message', MessageSchema)