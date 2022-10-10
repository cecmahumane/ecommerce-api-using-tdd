import React from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";

const Register = () => {
  const navigate = useNavigate();
  const [verifyEmail, setVerifyEmail] = React.useState(false);
  const [verifyPassword, setVerifyPassword] = React.useState(false);
  const [existingEmail, setExistingEmail] = React.useState(false);
  const [registerData, setRegisterData] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  // console.log(registerData)

  const submitData = async (event) => {
    event.preventDefault();
    if (validator.isEmail(registerData.email)) {
      if (registerData.password === registerData.confirmPassword) {
        try {
          const body = registerData;
          const response = await fetch(
            `${process.env.REACT_APP_ORIGIN}/api/profile`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            }
          );
          if (response.status === 409) {
            return setExistingEmail(true);
          }
        } catch (err) {
          console.error(err.message);
        }
        setRegisterData({
          email: "",
          password: "",
          confirmPassword: "",
        });
        /*  navigate('/login'); */
        if (
          verifyEmail === true ||
          verifyPassword === true ||
          existingEmail === true
        ) {
          setExistingEmail(false);
          setVerifyEmail(false);
          setVerifyPassword(false);
        }
      } else {
        setVerifyPassword(true);
      }
    } else {
      setVerifyEmail(true);
    }
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setRegisterData((prevRegisterData) => {
      return {
        ...prevRegisterData,
        [event.target.name]: event.target.value,
      };
    });
  };

  return (
    <div className="register" data-test="register">
      <div className="profile-image" data-test="profile-image"></div>
      <h2 data-test="header">
        Register a new <br /> account below!
      </h2>
      <form onSubmit={submitData}>
        <input
          className="email"
          data-test="email"
          placeholder="E-mail"
          name="email"
          onChange={handleChange}
          value={registerData.email}
        />
        <input
          className="password"
          data-test="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={registerData.password}
        />
        <input
          className="confirmpassword"
          data-test="confirmpassword"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
          value={registerData.confirmPassword}
        />
        {/* <br/> */}
        {/* <input
                type="checkbox" 
                id="remember-me" 
                // checked={formData.isFriendly}
                // onChange={handleChange}
                name="remember-me"
                />
            <label htmlFor='remember-me'>Remember me</label> */}
        {existingEmail && (
          <p
            data-test="existing-email-warning"
            className="existing-email-warning"
          >
            Please enter unique E-mail
          </p>
        )}
        {verifyPassword && (
          <p data-test="password-warning" className="password-warning">
            Please enter matching passwords
          </p>
        )}
        {verifyEmail && (
          <p data-test="email-warning" className="email-warning">
            Please enter valid E-mail
          </p>
        )}
        <br />
        <button data-test="register-button" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
