//Schema and Model from Mongoose that create a new task
const { Schema, model } = require('mongoose');

const timeSchema = new Schema({
    minutes: { type: String, required: true },
    seconds: { type: String, required: true },
    miliseconds: { type: String, required: true }
});

module.exports = model("Time", timeSchema, "cronometer-time");