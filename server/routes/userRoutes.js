const UserController = require('../controllers/user.controller');

module.exports = app => {
    app.post('/api/register', UserController.registerUser)
    app.get('/api/loggedInUser/:id', UserController.getLoggedInUser)
    app.post('/api/login', UserController.login)
    app.post('/api/logout', UserController.logout)
}