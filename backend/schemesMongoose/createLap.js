//Schema and Model from Mongoose that create a new task
const { Schema, model } = require('mongoose');

const lapSchema = new Schema({
    number: { type: String, required: true },
    label: { type: String, required: true },
    time: { type: String, required: true }
});

module.exports = model("Lap", lapSchema, "cronometer-laps");