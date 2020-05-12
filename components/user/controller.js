const store = require('./store')
const bcrypt = require('bcrypt')
const authExport = require('../../auth/index') 

async function addUser(data) {
    if (!data.name || !data.userName || !data.password) {
        return Promise.reject('Formulario incompleto')
    }
    const fullUser = {
        name: data.name,
        userName: data.userName,
        password: await bcrypt.hash(data.password, 5),
        rol: "ROL_STUDENT"
    }
    let newUser = await store.add(fullUser)

    await store.pushRoom(newUser._id, '5ebae712ca814c4ad03a3df2')

    return newUser
}

async function login(data) {
    if (!data.userName || !data.password) {
        return Promise.reject('Formulario incompleto')
    }
    let user = await store.searchByuserName(data.userName)
    if(user === null) {
        return Promise.reject('Usuario o contraseña incorrectos')
    }
    const auth = {
        name: user.name,
        userName: user.userName,
        rol: user.rol
    }

    const userFinal = {
        token: authExport.sign(auth)
    }
    let password = await  bcrypt.compare(data.password, user.password)
    if(password === true) {
        let online = await store.onlineUser(user._id)
        if(online === true) {
            return userFinal
        }
    }else {
        return Promise.reject('Usuario o contraseña incorrectos')
    }
}

module.exports = {
    add: addUser,
    login
}