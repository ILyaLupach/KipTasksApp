const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: {type: [String],required: true},
    date: { type: Date, default: Date.now },
    start: Date,
    finish: Date,
    position: {type: String,required: true},
    object: {type: String,required: true},
    failure: {type: String,required: true},
    fix: {type: String,required: true}
});

const tasks = mongoose.model("tasks", taskSchema);

module.exports = tasks;
