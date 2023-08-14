import React, {useState, useRef, useEffect, useContext} from 'react';
import MessageForm from './MessageForm';
import { userContext } from '../context/userContext';
import moment from 'moment';
import axios from 'axios';
const Messages = (props) => {
    const {loggedInUser, setLoggedInUser} = useContext(userContext);
    const {socket, room} = props
    const messageRef = useRef(null)
    const [messages, setMessages] = useState([])

    // ! broadcast message
    useEffect(() => {
        axios.get(`http://localhost:8000/api/allMessages/${room}`)
            .then((res) => {
                console.log(res);
                setMessages(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
        socket.on('broadcast-messages-to-room', (data) => {
            console.log(data);
            setMessages((prevMessages) => [...prevMessages, data]);
        });
    }, []);

    // ! Auto scroll to bottom of message box
    useEffect(() => {
        messageRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    
    return (
        <div className='chat-box border'>
            <div className='d-flex flex-column p-5'>
                {
                    messages.map((message, idx) => {
                        if (message.username === loggedInUser.username) {
                            return (
                                <div key={idx} className='indv-messages user'>
                                    <h3>{message.username} says:</h3>
                                    <p>{message.messageBody}</p>
                                    <span>{moment(message.createdAt).format('kk:mm:ss A')}</span>
                                </div>
                            )
                        } else {
                            return (
                                <div key={idx} className='indv-messages'>
                                    <h3>{message.username} says:</h3>
                                    <p>{message.messageBody}</p>
                                    <span>{moment(message.createdAt).format('kk:mm:ss A')}</span>
                                </div>
                            )
                        }
                    })
                }
                <div ref={messageRef}></div>
            </div> 
            <MessageForm socket={socket} room={room}/>
        </div>
)
}
export default Messages;