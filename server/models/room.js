const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    roomName:{
        type:String,
        required:[true, 'Room name is required']
    },
    users_in_room:{
        type:Array,
    }
    // ! Might add in a user who created the room if I allow users to make their own rooms
}, {timestamps:true})

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;