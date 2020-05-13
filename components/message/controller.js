const store = require('./store')
const mongoose = require('mongoose')
const socket = require('../../socket').socket

async function listByRoom(idRoom) {
    if (!idRoom) {
        return Promise.reject('falta el id de sala')
    }
    if (!mongoose.Types.ObjectId.isValid(idRoom)) {
        return Promise.reject('Id de sala no validos')
    }
    return store.list(idRoom)
}

async function addMessage(data) {
    if (!data.room || !data.user || !data.message) {
        return Promise.reject('Formulario incompleto')
    }
    if (!mongoose.Types.ObjectId.isValid(data.room) || !mongoose.Types.ObjectId.isValid(data.user)) {
        return Promise.reject('Id de sala o usuario no validos')
    }
    const fullMessage = {
        room: data.room,
        user: data.user,
        message: data.message
    }
    let message = await store.add(fullMessage)
    
    let search = await store.searchMessageByid(message._id)

    socket.io.emit('message', search)

    return message
}

module.exports = {
    add: addMessage,
    list: listByRoom
}