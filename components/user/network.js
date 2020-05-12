const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')

const router = express.Router();

router.get('/', (req, res) => {
    controller.list().then(data => {
        response.success(req,res,data, 200)
    })
})

module.exports = router