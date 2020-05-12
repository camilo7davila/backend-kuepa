const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const mySchema = new Schema({
    room: {type: Schema.Types.ObjectId, ref: 'Room' ,required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    message: {type: String, required: true, minlength: [2,'minimo debe tener 2 caracteres el mensaje']}
}, {
    timestamps: true
})

const model = mongoose.model('Message', mySchema);
module.exports = model