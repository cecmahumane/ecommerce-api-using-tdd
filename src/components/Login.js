import React, { useEffect } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import axios from "axios"
import networkManager from '../utilities/NetworkManager';

const Login = () => {
    const [loginError, setLoginError] = React.useState(false);
    const [sessCart, setSessCart, 
        finalOutput, setFinalOutput, 
        loginData, setLoginData, 
        signedIn, setSignedIn] = useOutletContext();
    
    const navigate = useNavigate();
    
    const handleChange = (event) => {
        console.log(event.target.value);
        setLoginData((prevLoginData) => {
            return {
                ...prevLoginData,
                [event.target.name]: event.target.value,
            }
        });
    };

    const submitData = async (event) => {
        event.preventDefault();
        try {
            const data = loginData;
            const response = await networkManager.makeRequest("verify_login_data", data);
            console.log(response.data);
            if (response.data) {
                setLoginError(false);
                setSignedIn(true);
                navigate('/orders');
            }
            setLoginError(true);
        } catch (error) {
            console.log(error)
        }
    };
        

    return (
        <div className='login' data-test="login" >
            <div className='profile-image' data-test='profile-image'></div>
            <h2 data-test='header'>Welcome Back!</h2>
            <form onSubmit={submitData}>
                <input
                    className='email'
                    data-test='email'
                    placeholder='E-mail'
                    name='email'
                    onChange={handleChange}
                />
                <input
                    className='password'
                    data-test='password'
                    placeholder='Password'
                    name='password'
                    onChange={handleChange}
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
            {loginError && <p>Incorrect login credentials</p>}
            <Link to='/register'><p className='no-account' data-test='no-account'>No account? Register here</p></Link>
        </div>
    )
}

export default Login