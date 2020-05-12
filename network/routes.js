const express = require('express');
const user = require('../components/user/network')
const room = require('../components/room/network')
const message = require('../components/message/network')

const routes = function (server) {
    server.use('/user', user)
    server.use('/room', room)
    server.use('/message', message)
}

module.exports = routes