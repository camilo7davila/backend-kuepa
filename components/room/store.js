const Model = require('./model')

function add (data) {
    const myRoom = new Model(data)
    return myRoom.save()
}

module.exports = {
    add
}