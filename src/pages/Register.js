import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/Register.css';
import Logo from '../images/recipe_logo.png';
import axios from 'axios';

const Register = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  
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
          console.log('Form data submitted:', response.data);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card">
        <div className='text-center'>
          <img src={Logo} alt="Logo" style={{width: '150px'}}/>
        </div>
        <h3 className="mb-4 mt-4 register">Register</h3>
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
              <label for="floatingInput" className='form-label'>First Name</label>
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
                type="email" 
                name="email" 
                id="floatingInput"
                className="form-control" 
                placeholder="abc@gmail.com" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
              <label for="floatingInput" className='form-label'>Email</label>
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
              <label for="floatingInput" className='form-label'>Phone Number</label>
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
              <label for="floatingInput" className='form-label'>Password</label>
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
              <label for="floatingInput" className='form-label'>Confirm Password</label>
              {passwordMatchError && <div className="invalid-feedback">The password does not match</div>}
            </div>
          </div>
          <button type="submit" className="btn w-10">Create Account</button>
        </form>
        <div className="text-center mt-3">
          Already have an account? <a href="/login" className='login'>Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
