import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import {BrowserRouter, Link, Route, Routes, useLocation} from 'react-router-dom'
import './App.css';
import Homepage from './components/Homepage';
import Room from './components/Room';
import Nav from './components/Nav';
import Login from './components/Login';
import { UserProvider } from './context/userContext';
import Register from './components/Register';

function App() {
  // notice that we pass a callback function to initialize the socket
  // we don't need to destructure the 'setSocket' function since we won't be updating the socket state
  // const navigate = useNavigate()
  const location = useLocation().pathname;
  const [socket] = useState(() => io(':8000'));
  const [isConnected, setIsConnected] = useState(socket.connected);

  // const [username, setUsername] = useState('')
  

  useEffect(() => {
    // we need to set up all of our event listeners
    // in the useEffect callback function
    socket.on('connect', () => {
      console.log('HERE');
      setIsConnected(true);
    });
    // note that we're returning a callback function
    // this ensures that the underlying socket will be closed if App is unmounted
    // this would be more critical if we were creating the socket in a subcomponent
    return () => {
      socket.disconnect(true, 'id')
    };
  }, []);


  return (
    <div className="App">
      {
        location === '/' || location === '/register'? 
        null:
        <Nav/>
      }
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/> 
          <Route path='/homepage' element={<Homepage socket={socket}/>}/>
          <Route path='/chat/:room' element={<Room socket={socket}/>}/>
        </Routes>
    </div>
  );
}

export default App;
