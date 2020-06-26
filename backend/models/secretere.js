const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const secretSchema = new Schema({
    id_doctor: {
        type: Schema.Types.ObjectId,
        ref: 'doctor'
    },
    id_user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });



module.exports = mongoose.model('secrt', secretSchema);