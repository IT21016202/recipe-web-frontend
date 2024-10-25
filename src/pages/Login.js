import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/styles.css';
import Logo from '../images/recipe_logo.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { user, login } = useAuth();
    const navigate = useNavigate();

    const [loginError, setLoginError] = useState(false);

    useEffect(() => {
        if(user){
            navigate('/home');
        }
    }, [user, navigate]);


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
            login(response.data.token); 
            navigate('/home');
        })
        .catch(error => {
            console.error('There was an error!', error.response);
            if(error.response){
                setLoginError(true);
            }
        });
        
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="login-card">
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
                            <label for="floatingInput" className='form-label'>Email Address *</label>
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
                            <label for="floatingInput" className='form-label'>Password *</label>
                            <p className='pass-info mt-1 mb-4'>Password must at least 6 characters long</p>
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
                    Don't have an account? <Link className='register' to="/register"><b>Create an account</b></Link>
                </div>
            </div>
        </div>
    )
}

export default Login