const db = require('./db')
const express = require('express')
const app = express();
const server = require('http').Server(app)

const cors = require('cors')
const bodyParser = require('body-parser')
const socket = require('./socket')
const router = require('./network/routes')
const errors = require('./network/error')

db('mongodb+srv://camiloAdmin:madrid321431462@cluster0-rszgv.mongodb.net/test?retryWrites=true&w=majority')


app.use(cors())
app.use(bodyParser.json());
socket.connect(server)

router(app)

app.use(errors)

app.use('/app', express.static('public'))
app.set('port', process.env.PORT || 3000)

server.listen(app.get('port')), () => {
    console.log(`La app esta escuchando en ${app.get('port')}`);
}