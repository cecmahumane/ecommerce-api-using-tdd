import React, { useEffect } from 'react'
import { useOutletContext, Link } from 'react-router-dom';

const CheckoutCancelPage = () => {
  const [
    sessCart, setSessCart, finalOutput, setFinalOutput, loginData, setLoginData,
    signedIn, setSignedIn
  ] = useOutletContext();

  // Recover your cart
  const retrieveSessCartFromLocalStorage = () => {
    let retrievedSessCart = JSON.parse(localStorage.getItem('sessCart'));
    console.log(retrievedSessCart);
    setSessCart(retrievedSessCart);
  };

  //Maintain signed in status
  const retrieveSignedInFromLocalStorage = () => {
    let retrievedSignedIn = JSON.parse(localStorage.getItem('signedIn'));
    console.log(retrievedSignedIn);
    setSignedIn(retrievedSignedIn);
  };

  //Maintain login data
  const retrieveLoginDataFromLocalStorage = () => {
    let retrievedLoginData = JSON.parse(localStorage.getItem('loginData'));
    console.log(retrievedLoginData);
    setLoginData(retrievedLoginData);
  };

  // const retrieveOutputFromLocalStorage = () => {
  //   let retrievedOutput = JSON.parse(localStorage.getItem('finalOutput'));
  //   console.log(retrievedOutput);
  //   setFinalOutput(retrievedOutput);
  // };

  useEffect(() => {
    // retrieveOutputFromLocalStorage();
    retrieveSessCartFromLocalStorage();
    retrieveLoginDataFromLocalStorage();
    retrieveSignedInFromLocalStorage();
    console.log("local storage retrieved");
    localStorage.clear();
    console.log("local storage cleared")
  }, []);

  return (
    <div className='checkout-cancel'>
      <h1>Checkout Cancelled</h1>
      <p>Your order was not placed successfully</p>
      <Link to='/'><div className='continue-shopping'>
        <p className='continue-shopping-text'>Continue Shopping</p>
      </div>
      </Link>
    </div>
  )
}

export default CheckoutCancelPage