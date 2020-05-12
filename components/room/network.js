const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')

const router = express.Router();

router.post('/', (req,res) => {
    controller.addRoom(req.body).then(data => {
        response.success(req,res,data, 200)
    }).catch(e => {
        response.error(req,res,e,500,e)
    })
})

router.get('/:id', (req,res) => {
    controller.searchById(req.params.id).then(data => {
        response.success(req,res,data, 200)
    }).catch(e => {
        response.error(req,res,e,500,e)
    })
})

module.exports = router