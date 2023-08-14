const RoomController = require('../controllers/room.controller');

module.exports = app => {
    app.post('/api/newRoom', RoomController.createNewRoom)
    app.get('/api/usersInRoom/:roomName', RoomController.getUsersInRoom)
    app.put('/api/joinRoom/:roomName', RoomController.joinRoom)
    app.put('/api/leaveRoom/:roomName', RoomController.leaveRoom)
}