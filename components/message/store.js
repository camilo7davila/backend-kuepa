const Model = require('./model')

function listByRoom (idRooom) {
    return new Promise ((resolve,reject) => {
        Model.find({room: idRooom}).exec((err, data) => {
            if(err) {
                reject('Ocurrio un error listando mensajes')
            }
            resolve(data)
        })
    })
}

function addMessage(data) {
    const myMessage = new Model(data)
    return myMessage.save()
}


module.exports = {
    add: addMessage,
    list: listByRoom
}