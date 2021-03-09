const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const cors = require('cors')
const { PORT } = require('./src/helper/env')
const socket = require('./src/helper/socket')

const userRoute = require('./src/route/users')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use(userRoute)
app.use('/images', express.static('./public/images'))

app.get('/', (req, res) => {
    res.send(`<h1>It works</h1>`)
})

const server = http.createServer(app)
socket(server)

server.listen(PORT, () => {
    console.log('Server running on port ' + PORT)
})