// src/Signup.jsx
import React, { useState } from 'react';
import { useNavigate , Link} from 'react-router-dom';
import { signup } from './authService';  // Correct import path
import { toast, ToastContainer } from 'react-toastify';

const Signup = ({ setIsAuthenticated, setloading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email.trim() === "" || password.trim() === "") {
        toast.error("please enter the details",{autoClose:1000})
        return;
    }else{
      setloading(true)
      const data = await signup(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', email);
      setIsAuthenticated(true);
      setloading(false)
      return navigate('/');
    }
      
    } catch (err) {
      toast.error("Signup Failed" , {autoClose:1000})
      setloading(false)
    }
  };

  return (
    <div className="container vh-100 ">
      <form onSubmit={handleSubmit} className='my-3 mt-5 p-5 mx-auto'>
        <h2 className='my-3'>Signup</h2>
        <div className='mb-3'>
         
        <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
          <input
          
          className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label or="exampleInputPassword1" className="form-label">Password</label>
          <input
          
          className="form-control" id="exampleInputPassword1" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary my-3 mb-4" type="submit">Signup</button>
      <p>Already have an Account ? <Link to='/login'>Login Here!</Link></p>
        <ToastContainer/>
      </form>
      
    </div>
  );
};

export default Signup;
