const Room = require('../models/room');

module.exports = {
    createNewRoom: async (req, res) => {
        try{
            const existingRoom = await Room.find({roomName:req.body.roomName})
            if(existingRoom.length > 0){
                return res.status(400).json({message:"Room already exists"})
            }else{
                const newRoom = await Room.create(req.body);
                res.status(201).json(newRoom)
            }
        }
        catch(err){
            res.status(400).json(err)
        }
    },
    joinRoom: async (req, res) => {
        try{
            console.log(req.body);
            const roomToJoin = await Room.findOneAndUpdate(
                {roomName:req.params.roomName}, 
                {$addToSet: {users_in_room: req.body}}, 
                {new:true, runValidators:true}
            );
            // console.log(roomToJoin);
            res.status(202).json(roomToJoin);
        }
        catch(err){
            res.status(400).json(err)
        }
    },
    leaveRoom: async (req, res) => {
        try{
            const leavingRoom = await Room.findOneAndUpdate(
                {roomName:req.params.roomName}, 
                {$pull: {users_in_room:req.body}},
                {new:true, runValidators:true}
            )
            res.status(201).json(leavingRoom);
        }
        catch(err){
            res.status(400).json(err)
        }
    },
    getUsersInRoom : async (req, res) => {
        try{
            const usersInRoom = await Room.findOne({roomName:req.params.roomName})
            res.status(200).json(usersInRoom)
        }
        catch(err){ 
            res.status(400).json(err)
        }
    }
}