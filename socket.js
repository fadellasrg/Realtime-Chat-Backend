const socketio = require('socket.io')
const db = require('./src/config/db')

module.exports = (server) => {
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
        // socket.on('get-list-users', (idUser, roomId) => {
        //     db.query(`SELECT * FROM users LEFT JOIN friends ON users.id = friends.id_user
        //     WHERE friends.id_friend = ${idUser}`, (err, result) => {
        //         io.to(roomId).emit('res-get-list-users', result)
        //         console.log(roomId)
        //     })
        // })
    
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

        // socket.on('add-friend', (data) => {
        //     db.query(`INSERT INTO chat 
        //     (from_id, to_id, message) VALUES
        //     ('${data.from}', '${data.to}', '${data.msg}')`, (err, result) => {
    
        //         db.query(`SELECT chat.created_at, chat.from_id, chat.to_id, chat.message, user_from.name as from_name, user_from.room_id as from_room_id, user_to.room_id as to_room_id FROM chat LEFT JOIN users as user_from ON chat.from_id=user_from.id LEFT JOIN users as user_to ON chat.to_id = user_to.id 
        //         WHERE (from_id='${data.from}' AND to_id='${data.to}') OR 
        //         (from_id='${data.to}' AND to_id='${data.from}')`,(err, result) => {
        //             // console.log(result)
        //             io.to(result[0].from_room_id).emit('res-get-list-chat', result)
        //             io.to(result[0].to_room_id).emit('res-get-list-chat', result)
        //         })
        //     })
        // })
    })
}