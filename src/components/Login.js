import React from 'react'
import {Link } from 'react-router-dom'

const Login = (props) => {
  return (
    <div className='login' data-test="login" >
        <div className='profile-image' data-test='profile-image'></div>
        <h2 data-test='header'>Welcome Back!</h2>
        <form>
            <input
                className='username'
                data-test='username'
                placeholder='Username'
                name='username'
            />
            <input
                className='password'
                data-test='password'
                placeholder='Password'
                name='password'
            />
            <br/>
            <input
                type="checkbox" 
                id="remember-me" 
                // checked={formData.isFriendly}
                // onChange={handleChange}
                name="remember-me"
                />
            <label htmlFor='remember-me'>Remember me</label>
            <br/>
            <button data-test='login' className='login-button'>Login</button>
        </form>
        <Link to='/register'><p className='no-account' data-test='no-account'>No account? Register here</p></Link>
    </div>
  )
}

export default Login