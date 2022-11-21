import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"

const Login = (props) => {

    // const getSessionData = async () => {
    //     try {
    //         const response = await axios.get(`${process.env.REACT_APP_ORIGIN}/api/session/`,
    //             {
    //                 withCredentials: true,
    //             });
    //         console.log(response);
    //         return response.data;
    //     } catch (err) {
    //         console.error(err.message)
    //     }
    // }

    // useEffect(() => {
    //     getSessionData();
    // },[])

    return (
        <div className='login' data-test="login" >
            <div className='profile-image' data-test='profile-image'></div>
            <h2 data-test='header'>Welcome Back!</h2>
            <form>
                <input
                    className='email'
                    data-test='email'
                    placeholder='E-mail'
                    name='email'
                />
                <input
                    className='password'
                    data-test='password'
                    placeholder='Password'
                    name='password'
                />
                <br />
                <input
                    type="checkbox"
                    id="remember-me"
                    // checked={formData.isFriendly}
                    // onChange={handleChange}
                    name="remember-me"
                />
                <label htmlFor='remember-me'>Remember me</label>
                <br />
                <button data-test='login' className='login-button'>Login</button>
            </form>
            <Link to='/register'><p className='no-account' data-test='no-account'>No account? Register here</p></Link>
        </div>
    )
}

export default Login