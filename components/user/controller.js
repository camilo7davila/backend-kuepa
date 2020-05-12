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
    return store.add(fullUser)
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
    return bcrypt.compare(data.password, user.password).then(sonIguales => {
        if (sonIguales === true) {
            return userFinal
        } else {
            return Promise.reject('La constraseña no coincide')
        }
    })
}

module.exports = {
    add: addUser,
    login
}