const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// patient Schema
const patientSchema = new Schema({
    nom : String,
    prenom : String ,
    email: { type: String, unique: true, lowercase: true },
    password: String,
}, { timestamps: true });


module.exports = mongoose.model('Patient', patientSchema);