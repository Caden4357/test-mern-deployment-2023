const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({

    user_id:{
        // type:String,
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:[true, 'User is required']
    },
    username:{
        type:String,
        required:[true, 'User is required']
    },
    room:{
        type:String,
        // type:mongoose.Types.ObjectId,
        // ref:"Room",
        required:[true, 'Room is required']
    },
    messageBody:{
        type:String,
        required:[true, 'Message Body is required']
    }
}, {timestamps:true})

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message