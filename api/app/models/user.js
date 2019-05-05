var mongoose = require("mongoose")
var Schema = mongoose.Schema

var UserSchema = new Schema({
    first_name: String,
    second_name: String,
    login: String,
    password: String,
    keywords: String
})

module.exports = mongoose.model('User', UserSchema)