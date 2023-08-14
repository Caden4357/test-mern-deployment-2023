import React, {useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
const Login = (props) => {
    const navigate = useNavigate()
    const [login, setLogin] = useState({
        email:'',
        password:''
    })

    const changeHandler = (e) => {
        setLogin({...login, [e.target.name]: e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', login, {withCredentials:true})
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
                <h1>Login</h1>
                <label className='form-label'>Email: </label>
                <input className='form-control' type="text" name="email" onChange={changeHandler} value={login.email}/>
                <label className='form-label'>Password: </label>
                <input className='form-control' type="password" name="password" onChange={changeHandler} value={login.password}/>
                <button className='btn btn-secondary mt-3'>Login</button>
                <br />
                <Link to={'/register'}>Dont have an account? Sign up here</Link>
            </form>
        </div>
)}

export default Login;