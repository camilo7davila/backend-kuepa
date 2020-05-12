const Model = require('./model')

function add (user) {
    const myUser = new Model(user)
    return myUser.save(); 
}

function searchByuserName(userName) {
    return new Promise ((resolve,reject) => {
        Model.findOne({userName: userName}).exec((err,user) => {
            if(err) {
                reject('Ocurrio un error buscnado el usuario')
            }
            resolve(user)
        })
    })
}

module.exports = {
    add,
    searchByuserName
}