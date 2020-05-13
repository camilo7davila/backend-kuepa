const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')

const router = express.Router();

router.get('/', (req, res) => {
    controller.list().then(data => {
        response.success(req,res,data, 200)
    })
})

router.post('/auth/register', (req,res) => {
    controller.add(req.body).then(data => {
        response.success(req,res,data,201)
    }).catch(e => {
        response.error(req,res,e,500, e)
    })
})

router.post('/auth/login', (req,res) => {
    controller.login(req.body).then(data => {
        response.success(req,res,data,202)
    }).catch(e => {
        response.error(req,res,e,500, e)
    })
})

router.post('/auth/logout', (req,res) => {
    controller.logout(req.body).then(data => {
        response.success(req,res,data,202)
    }).catch(e => {
        response.error(req,res,e,500, e)
    })
})

module.exports = router