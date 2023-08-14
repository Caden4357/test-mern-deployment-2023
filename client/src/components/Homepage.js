import React, {useState, useEffect, useContext} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import {userContext} from '../context/userContext'
import axios from 'axios';
import { socketContext } from '../context/socket';
const Homepage = (props) => {
    const navigate = useNavigate()
    const {loggedInUser, setLoggedInUser} = useContext(userContext);
    const {usersInRoom, setUsersInRoom} = useContext(socketContext);

    
    const {socket} = props
    const [users, setUsers] = useState([])
    const uuid = window.localStorage.getItem('uuid');
    // console.log(uuid);
    useEffect(() => {
        axios.get(`http://localhost:8000/api/loggedInUser/${uuid}`)
            .then((res) => {
                // console.log(res);
                setLoggedInUser(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
        socket.on('new-user-joined-server', users => {
            console.log(users);
            setUsers(users)
        })
        

    }, [])


    const joinRoom = (room) => {
        axios.put(`http://localhost:8000/api/joinRoom/${room}`, {username:loggedInUser.username, uuid:uuid})
            .then((res) => {
                // setUsersInRoom(res.data.users_in_room)
                socket.emit(`join-room`, {room:room, usersInRoom: res.data.users_in_room })
            })
            .catch((err) => {
                console.log(err);
            })
        navigate(`/chat/${room}`)
    }

    return (
        <div>
            <h1>Welcome to Chat Socket {loggedInUser.username}</h1>
            <h2>Which room would you like to go to?</h2>
            <button onClick={() => joinRoom('memes')} className='btn btn-dark'>Memes</button>
            <button onClick={() => joinRoom('politics')} className='btn btn-dark'>Politics</button>
            <button onClick={() => joinRoom('science&technology')} className='btn btn-dark'>Science & Technology</button>
            <button onClick={() => joinRoom('sports')} className='btn btn-dark'>Sports</button>
        </div>
)}

export default Homepage;