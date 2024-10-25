import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/styles.css';
import Logo from '../images/recipe_logo.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.password !== formData.confirmPassword) {
      setPasswordMatchError(true);
    }else {
      setPasswordMatchError(false);

      axios.post(BASE_URL+'/api/auth/register', formData)
        .then(response => {
          login(response.data.token); 
          navigate('/home');
        })
        .catch(error => {
          console.error('There was an error!', error);
          window.alert('Please fill the form correctly');
        });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="register-card">
        <div className='text-center'>
          <img src={Logo} alt="Logo" style={{width: '150px'}}/>
        </div>
        <h3 className="mb-4 mt-4 register-topic">Register</h3>
        <form onSubmit={handleSubmit}>

          <div className='row'>
            <div className="form-floating mb-3 col-md-6">
              <input 
                type="text" 
                name="firstName" 
                id="floatingInput"
                className="form-control" 
                placeholder="First name" 
                value={formData.firstName}
                onChange={handleChange}
                required 
              />
              <label for="floatingInput" className='form-label'>First Name <span>*</span></label>
            </div>
            <div className="form-floating mb-3 col-md-6">
              <input 
                type="text" 
                name="lastName" 
                id="floatingInput"
                className="form-control" 
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
              />
              <label for="floatingInput" className='form-label'>Last Name</label>
            </div>
          </div>
          
          <div className='row'>
            <div className="form-floating mb-3 col-md-6">
              <input 
                type="text" 
                name="email" 
                id="floatingInput"
                className="form-control" 
                placeholder="abc@gmail.com" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
              <label for="floatingInput" className='form-label'>Email *</label>
            </div>
            <div className="form-floating mb-3 col-md-6">
              <input 
                type="text" 
                name="phoneNumber" 
                id="floatingInput"
                className="form-control" 
                placeholder="011 2222 333"
                value={formData.phoneNumber}
                onChange={handleChange}
                required 
              />
              <label for="floatingInput" className='form-label'>Phone Number *</label>
            </div>
          </div>

          <div className='row'>
            <div className="form-floating mb-3 col-md-6">
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
              <p className='pass-info mt-1'>Password must at least 6 characters long</p>
            </div>
            <div className="form-floating mb-3 col-md-6">
              <input 
                type="password" 
                name="confirmPassword" 
                id="floatingInput"
                className={`form-control ${passwordMatchError ? 'is-invalid' : ''}`}
                placeholder="Confirm Password" 
                value={formData.confirmPassword}
                onChange={handleChange}
                required 
              />
              <label for="floatingInput" className='form-label'>Confirm Password *</label>
              {passwordMatchError && <div className="invalid-feedback">The password does not match</div>}
            </div>
          </div>
          <button type="submit" className="btn w-10 mt-3">Create Account</button>
        </form>
        <div className="text-center mt-5 already">
          Already have an account? <Link className='registr-login' to="/"><b>Login</b></Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
