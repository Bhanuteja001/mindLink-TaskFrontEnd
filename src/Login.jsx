import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from './authService';  
import { ToastContainer, toast } from 'react-toastify';


const Login = ({ setIsAuthenticated , setloading}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email.trim() === "" || password.trim() === "") {
        toast.error("please enter the details",{autoClose:1000})
        return;
    }
    else{
      setloading(true)
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', email);
      setIsAuthenticated(true);
      setloading(false)
      return navigate('/');
    }
      
    } catch (err) {
        setloading(false)
      setError('Invalid credentials');

      toast.error("Invalid Credentials" , {autoClose:1000})
    }
  };

  return (
    <div className="container vh-100">
      <form onSubmit={handleSubmit} className='mt-5 p-5 rounded-3 mx-auto'>
        <h2>Login</h2>
        {error && <p>{error}</p>}
        <div className="my-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
          <input
          className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input
          className="form-control" id="exampleInputPassword1"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='btn btn-primary mb-4'>Login</button>
      <p>Donot have an Account ? <Link to='/signup'>Register Here!</Link></p>
        <ToastContainer/>
      </form>

    </div>
  );
};

export default Login;
