const store = require('./store')

async function addRoom(data) {
    if (!data.roomName || !data.subject) {
        return Promise.reject('Formulario incompleto')
    }
    return store.add(data)
}

module.exports = {
    addRoom
}