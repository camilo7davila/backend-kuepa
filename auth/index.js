const jwt = require('jsonwebtoken')

function sign(user) {
    const auth = {
        name: user.name,
        userName: user.userName,
        rol: user.rol
    }
    return jwt.sign(auth, 'secreto')
}

const check = {
    own: function (req, owner) {
        const decode = decodeHeader(req)
        console.log(decode);

        if (decode.id !== owner) {
            throw error('No puede hacer esto')
        }
    },

    logged: function (req) {
        const decode = decodeHeader(req)
    }
}

function verify(token) {
    return jwt.verify(token, 'secreto')
}

function getToken(auth) {
    if (!auth) {
        throw new Error('No viene token')
    }

    if (auth.indexOf('Bearer ') === -1) {
        throw new Error('Formato invalido')
    }
    let token = auth.replace('Bearer ', '');

    return token;
}


function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decode = verify(token)

    req.user = decode

    return decode
}

module.exports = {
    sign,
    check,
}