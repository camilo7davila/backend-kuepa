const store = require('./store')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
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
    let validation = await store.validarUserName(data.userName)

    if(validation.length !== 0) {
        return Promise.reject('Nickname ya esta en uso')
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
    if (user === null) {
        return Promise.reject('Usuario o contraseña incorrectos')
    }

    const userFinal = {
        token: authExport.sign(user)
    }
    let password = await bcrypt.compare(data.password, user.password)
    if (password === true) {
        let online = await store.onlineUser(user._id)
        if (online === true) {
            return userFinal
        }
    } else {
        return Promise.reject('Usuario o contraseña incorrectos')
    }
}

async function logout(data) {
    if (!data.id) {
        return Promise.reject('Formulario incompleto')
    }
    if (!mongoose.Types.ObjectId.isValid(data.id)) {
        return Promise.reject('Id no valido')
    }
    return store.offlineUser(data.id)
}

module.exports = {
    add: addUser,
    login,
    logout
}