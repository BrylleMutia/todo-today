const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const todoSchema = require("../models/Item");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    register_date: {
        type: Date,
        default: Date.now,
    },
    todos: [todoSchema]
});

module.exports = User = mongoose.model("user", userSchema);
