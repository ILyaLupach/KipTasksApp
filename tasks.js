const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: [String],
    date: { type: Date, default: Date.now },
    start: Date,
    finish: Date,
    position: String,
    object: String,
    failure: String,
    fix: String
});

const tasks = mongoose.model("tasks", taskSchema);

module.exports = tasks;
