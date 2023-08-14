import React, { useState, useEffect, useRef, useContext} from 'react';
import './Messages.css'
import Messages from './Messages';
import UsersInRoom from './UsersInRoom';
import { useParams } from 'react-router-dom';
import { socketContext } from '../context/socket';
const Memes = (props) => {
    const {room} = useParams()
    const { socket } = props
    const [usersInMemes, setUsersInMemes] = useState([])
    const {usersInRoom, setUsersInRoom} = useContext(socketContext);
    // ! New user joined memes
    useEffect(() => {
        socket.on('new-user-joined-room', data => {
            // console.log("%%%%%%%%%%%%%%", data);
            // console.log('firing NUJM');
            // setUsersInMemes(data)
            setUsersInRoom(data)
        })
    }, [])

    // ! Update users in room after user has left
    useEffect(() => {
        socket.on('current-users-in-room', data => {
            // console.log("**************", data);
            // console.log('firing CUIN');
            // setUsersInMemes(data)
            setUsersInRoom(data.data.users_in_room)
        })
    }, [])

    return (
        <div>
            <UsersInRoom room={room} socket={socket} usersInMemes={usersInMemes} setUsersInMemes={setUsersInMemes}/>
            <Messages room={room} socket={socket}/>
        </div>
    )
}

export default Memes;