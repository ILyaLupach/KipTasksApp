const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workshopSchema = new Schema({
        name: String,
        object: [String]
});

const workshop = mongoose.model("workshop", workshopSchema);

module.exports = workshop;
