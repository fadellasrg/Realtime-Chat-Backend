const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./src/config/db')
const PORT = 4000

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

const io = socketio(server, {
    cors: {
        origin: '*'
    }
})

io.on('connection', (socket) => {
    console.log('user connected!')

    socket.on('join-room', (room_id) => {
        socket.join(room_id)
    })

    socket.on('get-list-users', (idUser, roomId) => {
        db.query(`SELECT * FROM users WHERE id != ${idUser}`, (err, result) => {
            io.to(roomId).emit('res-get-list-users', result)
        })
    })

    socket.on('get-list-chat', (user) => {
        db.query(`SELECT chat.created_at, chat.from_id, chat.to_id, chat.message, user_from.name as from_name, user_from.room_id as from_room_id, user_to.image as image, user_to.room_id as to_room_id FROM chat LEFT JOIN users as user_from ON chat.from_id=user_from.id LEFT JOIN users as user_to ON chat.to_id = user_to.id 
        WHERE (from_id='${user.id_from}' AND to_id='${user.id_to}') OR 
        (from_id='${user.id_to}' AND to_id='${user.id_from}')`,(err, result) => {
            io.to(user.room_id).emit('res-get-list-chat', result)
        })
    })

    socket.on('send-message', (data) => {
        db.query(`INSERT INTO chat 
        (from_id, to_id, message) VALUES
        ('${data.from}', '${data.to}', '${data.msg}')`, (err, result) => {

            db.query(`SELECT chat.created_at, chat.from_id, chat.to_id, chat.message, user_from.name as from_name, user_from.room_id as from_room_id, user_to.room_id as to_room_id FROM chat LEFT JOIN users as user_from ON chat.from_id=user_from.id LEFT JOIN users as user_to ON chat.to_id = user_to.id 
            WHERE (from_id='${data.from}' AND to_id='${data.to}') OR 
            (from_id='${data.to}' AND to_id='${data.from}')`,(err, result) => {
                // console.log(result)
                io.to(result[0].from_room_id).emit('res-get-list-chat', result)
                io.to(result[0].to_room_id).emit('res-get-list-chat', result)
            })
        })
    })

    socket.on('send-broadcast', ((data) => {
        const result = `${data.from} : ${data.msg}`
        socket.broadcast.emit('res-broadcast', result)
    }))
})

server.listen(PORT, () => {
    console.log('Server running on port ' + PORT)
})