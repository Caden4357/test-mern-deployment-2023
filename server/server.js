const express = require('express');
const app = express();
const cors = require('cors');
const socket = require('socket.io');
const port = 8000;
const cookieParser = require('cookie-parser')
require('dotenv').config()
app.use(cors({credentials:true, origin:'http://localhost:3000'}))
const server = app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});
require("./config/mongooseConfig");

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cookieParser())

// to initialize the socket, we need to invoke a new instance
//     of socket.io and pass it our express server instance
// We must also include a configuration settings object to prevent CORS errors
const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
});
module.exports = {io:io}
require('./socket/socket');
require('./routes/userRoutes')(app);
require('./routes/messageRoutes')(app);
require('./routes/roomRoutes')(app);




