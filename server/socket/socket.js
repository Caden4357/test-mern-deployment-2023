let users = []
let {io} = require('../server')


io.on("connection", socket => {
    // NOTE: Each client that connects get their own socket id!
    // if this is logged in our node terminal, that means we a new client
    //     has successfully completed the handshake!
    console.log('user connected with this id: ' + socket.id);
    socket.on('disconnect', (data) => {
        console.log('User disconnected', data);
    })

    // We add our additional event listeners right inside this function
    // NOTE: "connection" is a BUILT IN events listener
    // ! Joining main server
    socket.on('join-server', username => {
        let newUser = { id: socket.id, username: username }
        users.push(newUser)

        io.emit('new-user-joined-server', users)
    })

    // ! Joining room
    socket.on('join-room', data => {
        socket.join(data.room)

        io.to(data.room).emit("new-user-joined-room", data.usersInRoom)
    })
    // ! Leaving room
    socket.on('user-leaving-room', (data) => {
        socket.leave(data.room)
        io.to(data.room).emit('current-users-in-room', data.updatedUsers)
    })

    // ! Messaging room
    socket.on('message-room', data => {
        console.log("*****************", data);
        io.to(data.room).emit('broadcast-messages-to-room', data)
    })
});