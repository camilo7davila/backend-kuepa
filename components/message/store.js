const Model = require('./model')

function listByRoom (idRooom) {
    return new Promise ((resolve,reject) => {
        Model.find({room: idRooom}).populate('user').exec((err, data) => {
            if(err) {
                reject('Ocurrio un error listando mensajes')
            }
            resolve(data)
        })
    })
}

function searchMessageByid(id){
    return new Promise ((resolve,reject) => {
        Model.findOne({_id: id}).populate('user').exec((err,data) => {
            if(err) {
                reject('Ocurrio un error busncaod el msj')
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
    list: listByRoom,
    searchMessageByid
}