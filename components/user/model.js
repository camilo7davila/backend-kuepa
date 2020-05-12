const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: {type: String, required: true, minlength: [2, 'El nombre es muy corto']},
    userName: {type: String, require: true, minlength: [2, 'Minimo 2 espacios']},
    password: {type: String, required: true, minlength: [2, 'Minimo de espacios es 2']},
    rol: {type: String, required: true},
}, {
    timestamps: true
})

const model = mongoose.model('User', mySchema);
module.exports = model