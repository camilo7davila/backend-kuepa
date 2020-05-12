const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const mySchema = new Schema({
    roomName: {type: String, required: true, minlength: [2, 'El nombre es muy corto']},
    subject: {type: String, required: true, minlength: [2, 'Minimo de espacio es 2']},
    users: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, {
    timestamps: true
})

const model = mongoose.model('Room', mySchema);
module.exports = model