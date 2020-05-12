const express = require('express');
const user = require('../components/user/network')
const room = require('../components/room/network')

const routes = function (server) {
    server.use('/user', user)
    server.use('/room', room)
}

module.exports = routes