const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')
const secure = require('./secure')

const router = express.Router();

router.get('/listbyroom/:id', (req,res) => {
    controller.list(req.params.id).then(data => {
        response.success(req,res,data,201)
    }).catch(e => {
        response.error(req,res,e,500,e)
    })
})

router.post('/',secure('create') ,(req,res) => {
    controller.add(req.body).then(data => {
        response.success(req,res,data,201)
    }).catch(e => {
        response.error(req,res,e,500,e)
    })
})

module.exports = router