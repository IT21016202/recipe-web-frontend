import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/Login.css';
import Logo from '../images/recipe_logo.png';
import axios from 'axios';

const Login = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [loginError, setLoginError] = useState(false);

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post(BASE_URL+'/api/auth/login', formData)
        .then(response => {
            setLoginError(false);
            console.log('Form data submitted:', response.data);
        })
        .catch(error => {
            console.error('There was an error!', error.response.status);
            if(error.response.status == 400){
                setLoginError(true);
            }
        });
        
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card">
                <div className='text-center'>
                    <img src={Logo} alt="Logo" style={{width: '150px'}}/>
                </div>
                <h3 className="mb-4 mt-4 login">Login</h3>
                <form onSubmit={handleSubmit}>

                    <div className='row'>
                        <div className="form-floating mb-3">
                            <input 
                                type="email" 
                                name="email" 
                                id="floatingInput"
                                className="form-control" 
                                placeholder="Email Address" 
                                value={formData.firstName}
                                onChange={handleChange}
                                required 
                            />
                            <label for="floatingInput" className='form-label'>Email Address</label>
                        </div>
                    </div>
                
                    <div className='row'>
                        <div className="form-floating mb-3">
                            <input 
                                type="password" 
                                name="password" 
                                id="floatingInput"
                                className="form-control" 
                                placeholder="Password" 
                                value={formData.password}
                                onChange={handleChange}
                                required 
                            />
                            <label for="floatingInput" className='form-label'>Password</label>
                        </div>
                    </div>
                    <button type="submit" className="btn w-100">SIGN IN</button>
                </form>
                {loginError && (
                    <div className="invalid-feedback d-block text-center mt-2">
                        <b>Your password or username is incorrect</b>
                    </div>
                )}
                
                <div className="text-center mt-5 dont">
                    Don't have an account? <a href="/login" className='register'>Create an account</a>
                </div>
            </div>
        </div>
    )
}

export default Login