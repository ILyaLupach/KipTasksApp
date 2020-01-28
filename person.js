const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personSchema = new Schema({
        name: String,
        surname: String,
        age: Number,
        phone: Number,
        position: String

});


const person = mongoose.model("person", personSchema);


module.exports = person;
