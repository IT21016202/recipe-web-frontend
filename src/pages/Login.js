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
            console.log('Form data submitted:', response.data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
        
    };

    return (
        <div>

        </div>
    )
}

export default Login