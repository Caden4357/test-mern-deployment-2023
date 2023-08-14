import React, {useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {userContext} from '../context/userContext';
import './Nav.css'
const Nav = (props) => {
    const navigate = useNavigate();
    const {loggedInUser, setLoggedInUser} = useContext(userContext);

    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials:true})
            .then((res) => {
                console.log(res);
                window.localStorage.removeItem('uuid')
                setLoggedInUser({})
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <nav>
            <h1>Chat Socket</h1>
            <div>
                <Link to={'/homepage'} ><button className='nav-btn'>Home</button></Link>
                <button className='nav-btn logout' onClick={logout}>Logout</button>
            </div>
        </nav>
)}

export default Nav;