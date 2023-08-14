const MessageController = require('../controllers/message.controller');

module.exports = app => {
    app.post('/api/newMessage', MessageController.newMessage)
    app.get('/api/allMessages/:room', MessageController.allMessagesInRoom)
}