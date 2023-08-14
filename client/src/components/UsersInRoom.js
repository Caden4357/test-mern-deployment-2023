import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../context/userContext';
import axios from 'axios';
import { socketContext } from '../context/socket';
const UsersInRoom = (props) => {
    const navigate = useNavigate()
    const {loggedInUser, setLoggedInUser} = useContext(userContext);
    const {usersInRoom, setUsersInRoom} = useContext(socketContext);

    const { socket, room } = props;


    // ! if you have different tabs open to test this will not work because the local storage is shared between tabs on the browser have to open a whole new browser for it to work
    const uuid = window.localStorage.getItem('uuid');
    console.log(uuid);
    useEffect(() => {
        axios.get(`http://localhost:8000/api/loggedInUser/${window.localStorage.getItem('uuid')}`)
            .then((res) => {
                setLoggedInUser(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
        return async () => {
            const updatedUsers = await axios.put(`http://localhost:8000/api/leaveRoom/${room}`, {username:loggedInUser.username, uuid:uuid})
            console.log(updatedUsers);
            setUsersInRoom(usersInRoom.filter((user) => user.username !== loggedInUser.username))
            socket.emit('user-leaving-room', {user:socket.id,room:room, updatedUsers:updatedUsers})
        }
    }, [])
    

    
    const leaveRoom = async () => {
        try{
            const updatedUsers = await axios.put(`http://localhost:8000/api/leaveRoom/${room}`, {username:loggedInUser.username, uuid:window.localStorage.getItem('uuid')})
            console.log(updatedUsers);
            setUsersInRoom(usersInRoom.filter((user) => user.username !== loggedInUser.username))
            socket.emit('user-leaving-room', {user:socket.id,room:room, updatedUsers:updatedUsers})
            navigate('/homepage')
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {  
        axios.get(`http://localhost:8000/api/usersInRoom/${room}`)
            .then((res) => {
                console.log(res);
                setUsersInRoom(res.data.users_in_room)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <div>
            <h1>Welcome to {room}: {loggedInUser.username}</h1>
            <button onClick={leaveRoom}>Leave {room}</button>
            <h2>Chat with any users in this channel:</h2>
            {
                usersInRoom.map((user, id) => (
                    <p key={id}>user: {user.username}</p>
                ))

            }
        </div>
    )
}

export default UsersInRoom;