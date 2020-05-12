const Model = require('./model')

function add (user) {
    const myUser = new Model(user)
    return myUser.save(); 
}