import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../containers/UserContext';
import '../styles/register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });

  const { updateUser } = useUser();
  const { email, username, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateUser({ username, email });
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      // Check if registration was successful
      if (response.ok) {
        console.log('Registration successful:', data);
        // Show toast notification
        toast.success('Registration successful');
      } else {
        console.error('Registration failed:', data);
        // Show toast notification for failure
        toast.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle any network or other errors
      // Show toast notification for error
      toast.error('Error occurred while registering');
    }
  };

  return (
    <div className="bg-gradient full-height">
    <div className="align-items-stretch border border-40 row overflow-hidden register-background ">
      <div className="col-md-6 white-box pt-5 pb-5 pright pleft d-flex align-items-center justify-content-center flex-column">
      <svg className="pb-3" xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
</svg>
        <h2 className='fw-bold text-center pb-3'>
        Create,<br></br> Account!

        </h2>
        <p className=' text-center'>Register your account here</p>
       </div>
      <div className="col-md-6  pt-5 pb-5 pright pleft blue-box">
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit} className='r-form'>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="form-control"
              minLength={6}
              required
            />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn light-blue-btn text-white">Register</button>
          </div>
        </form>
        <p className="mt-3 text-center">Already have an account? <Link to="/login">Login</Link></p>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
    </div>
  );
};

export default Register;
