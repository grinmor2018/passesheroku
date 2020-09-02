const { Schema, model } = require('mongoose');

const PassSchema = new Schema({
    web: { type: String, required: true, trim: true},
    user: { type: String, required: true},
    password: { type: String, required: true},
    email: { type: String, required: true,trim: true},
    clave: String,
    observations: String
}, {
    timestamps: true
});

module.exports = model('Pass', PassSchema);