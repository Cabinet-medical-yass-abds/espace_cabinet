const mongoose = require('mongoose');
const Schema = mongoose.Schema;



// doctor Schema
const patientSchema = new Schema({
    adress: {
        street: String,
        city: String,
        zip: String
    },
    numtel :String,
    man: { type: Boolean ,default :true },
    id_user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });



module.exports = mongoose.model('patient', patientSchema);