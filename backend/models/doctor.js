const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// doctor Schema
const doctorSchema = new Schema({
    spec: String,
    adress: {
        street: String,
        city: String,
        zip: String
    },
    man: { type: Boolean, required: true },
    bio: String,
    phone: String,
    id_secrt: {
        type: Schema.Types.ObjectId,
        ref: 'secrt'
    },
    id_user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });



module.exports = mongoose.model('doctor', doctorSchema);