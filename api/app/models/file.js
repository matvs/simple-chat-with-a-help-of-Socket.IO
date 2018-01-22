var mongoose = require("mongoose")
var Schema = mongoose.Schema

var FileSchema = new Schema({
    name: String,
    from: String,
    to: String,
})

module.exports = mongoose.model('File', FileSchema)