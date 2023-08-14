const Message = require('../models/message');
const jwt = require('jsonwebtoken');

module.exports = {

    allMessagesInRoom: async (req, res) => {
        try{
            const allMessages = await Message.find({room:req.params.room});
            res.status(200).json(allMessages);
        }
        catch(err){
            res.status(400).json(err);
        }
    },
    newMessage: async (req, res) => {
        try{
            const decodedJwt = jwt.decode(req.cookies.userToken, {complete:true});
            const message = {...req.body, user_id:decodedJwt.payload._id}
            console.log(message);
            const newMessage = await Message.create(message);
            res.status(201).json(newMessage);
        }
        catch(err){
            res.status(400).json(err);
        }
    }

}