const store = require('./store')
const mongoose = require('mongoose')

async function addRoom(data) {
    if (!data.roomName || !data.subject) {
        return Promise.reject('Formulario incompleto')
    }
    return store.add(data)
}

async function searchById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return Promise.reject('Id no valido')
    }
    let room = await store.search(id)
    if (room === null) {
        return (`no hay salas creadas con el ${id}`)
    }
    return store.search(id)
}

module.exports = {
    addRoom,
    searchById
}