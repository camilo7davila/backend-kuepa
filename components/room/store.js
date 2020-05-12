const Model = require('./model')

function add (data) {
    const myRoom = new Model(data)
    return myRoom.save()
}

function searchById (id) {
    return new Promise ((resolve,reject) => {
        Model.findOne({_id: id}).populate('users').exec((err, room) => {
            if(err) {
                reject('Ocurrio un problema buscando la sala')
            }
            resolve (room)
        })
    })
}

module.exports = {
    add,
    search: searchById
}