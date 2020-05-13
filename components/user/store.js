const Model = require('./model')
const ModelRoom = require('../room/model')

function add(user) {
    const myUser = new Model(user)
    return myUser.save();
}

function validarUserName(user) {
    return new Promise((resolve, reject) => {
        Model.find({userName: user}).exec((err,data) => {
            if (err) {
                reject('Ocurrio un error al agregar a sala')
            }
            resolve (data)
        })
    })
}

function pushRoom(idUser, idRoom) {
    return new Promise((resolve, reject) => {
        ModelRoom.findOneAndUpdate({_id: idRoom}, {$push: {users: idUser}}).exec((err, room) => {
            if (err) {
                reject('Ocurrio un error al agregar a sala')
            }
            resolve (true)
        })
    })
}

function searchByuserName(userName) {
    return new Promise((resolve, reject) => {
        Model.findOne({ userName: userName }).exec((err, user) => {
            if (err) {
                reject('Ocurrio un error buscando el usuario')
            }
            resolve(user)
        })
    })
}

function onlineUser(id) {
    return new Promise((resolve,reject) => {
        Model.findOneAndUpdate({_id: id},{status: true}).exec((err,user) => {
            if(err) {
                reject('ocurrio un error en ponerse en login')
            }
            resolve (true)
        })
    })
}

function offlineUser(id) {
    return new Promise((resolve,reject) => {
        Model.findOneAndUpdate({_id: id},{status: false}).exec((err,user) => {
            if(err) {
                reject('ocurrio un error en ponerse en login')
            }
            resolve (true)
        })
    })
}

module.exports = {
    add,
    searchByuserName,
    onlineUser,
    pushRoom,
    offlineUser,
    validarUserName
}