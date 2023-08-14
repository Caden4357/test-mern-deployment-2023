import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Register = (props) => {
    const navigate = useNavigate()
    const [login, setLogin] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const changeHandler = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }
    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', login, {withCredentials:true})
            .then((res) => {
                console.log(res);
                window.localStorage.setItem('uuid', res.data.user._id)
                navigate('/homepage')
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <div className='form-wrapper'>
            <h1>Chat Socket</h1>
            <form className='mx-auto p-3 user-form' onSubmit={submitHandler}>
                <h1>Register</h1>
                <label className='form-label'>Username: </label>
                <input className='form-control' type="text" name="username" onChange={changeHandler} value={login.username} />
                <label className='form-label'>Email: </label>
                <input className='form-control' type="text" name="email" onChange={changeHandler} value={login.email} />
                <label className='form-label'>Password: </label>
                <input className='form-control' type="password" name="password" onChange={changeHandler} value={login.password} />
                <label className='form-label'>Confirm Password: </label>
                <input className='form-control' type="password" name="confirmPassword" onChange={changeHandler} value={login.confirmPassword} />
                <button className='btn btn-secondary mt-3'>Login</button>
                <br />
                <Link to={'/'}>Already have an account? Log in here</Link>
            </form>
        </div>
    )
}

export default Register;