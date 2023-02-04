import React from 'react'
import networkManager from '../utilities/NetworkManager';
import { useParams, useSearchParams, useOutletContext } from 'react-router-dom'
import { useEffect } from 'react';
import { nanoid } from 'nanoid';

const CheckoutSuccessPage = () => {

  const [
          sessCart, setSessCart, finalOutput, setFinalOutput, loginData, setLoginData,
          signedIn, setSignedIn
        ] = useOutletContext();
  const [orderInfo, setOrderInfo] = React.useState({});
  const [generatedPassword, setGeneratedPassword] = React.useState("");
  const [outputPresent, setOutputPresent] = React.useState(false);

  console.log(orderInfo);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id') || '';
  console.log(sessionId);
  console.log(finalOutput)
 
  const retrieveLoginDataFromLocalStorage = () => {
    let retrievedLoginData = JSON.parse(localStorage.getItem('loginData'));
    console.log(retrievedLoginData);
    setLoginData(retrievedLoginData);
  };

  const retrieveSignedInFromLocalStorage = () => {
    let retrievedSignedIn = JSON.parse(localStorage.getItem('signedIn'));
    console.log(retrievedSignedIn);
    setSignedIn(retrievedSignedIn);
  };

  const retrieveOutputFromLocalStorage = () => {
    let retrievedOutput = JSON.parse(localStorage.getItem('finalOutput'));
    console.log(retrievedOutput);
    setFinalOutput(retrievedOutput);
  };

  //Random password generator
  let passwordGenerator = () => {
    let pwdChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let pwdLen = 10;
    let randPassword = new Array(pwdLen).fill(0).map(x => (function(chars) { let umax = Math.pow(2, 32), r = new Uint32Array(1), max = umax - (umax % chars.length); do { crypto.getRandomValues(r); } while(r[0] > max); return chars[r[0] % chars.length]; })(pwdChars)).join('');
    setGeneratedPassword(randPassword);
    getOrderInfo(randPassword);
  };

  let clearCart = async () => {
    let body = {};
    try {
      const response = await networkManager.makeRequest("empty_cart", body)
      setSessCart(response);
      // localStorage.clear();
      setFinalOutput([]);
    } catch (error) {
        console.log(error);
    }
  };

  let getOrderInfo = async (newPassword) => {
    let data = {session_id: sessionId};
    try {
      const response = await networkManager.makeRequest("get_order_info", data)
      console.log(response)
      setOrderInfo(response);
      console.log(response.data.email, newPassword);
      createCheckoutProfile(response.data.email, newPassword)
    } catch (error) {
      console.log(error);
    }
  };

  let retrievedId;
  let createCheckoutProfile = async (email, password) => {
    let body = {
      email: email,
      password: password
    }
    try {
      const response = await networkManager.makeRequest("create_checkout_profile", body);
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    try {
     const response = await networkManager.makeRequest("get_user_id", null);
     console.log(response)
     retrievedId = response.data.rows[0].id;
     console.log(retrievedId)
     writeToOrderTable(retrievedId);
    } catch (error) {
      console.log(error)
    }
  };

  let writeToOrderTable = async (userId) => {
    let body = {
      userId: userId,
      orderContent: JSON.stringify(finalOutput)
    };
    try {
      const response = await networkManager.makeRequest("write_to_order_table", body)
      console.log(response);
    } catch (error) {
      console.log(error)
    }
    clearCart();
  };

  useEffect(() => {
    console.log(finalOutput.length)
    if (finalOutput.length > 0) {
      passwordGenerator();
    } else {
      retrieveLoginDataFromLocalStorage();
      retrieveOutputFromLocalStorage();
      retrieveSignedInFromLocalStorage();
      console.log("local storage retrieved");
      localStorage.clear();
      console.log("local storage cleared")
      setOutputPresent(true);
    };

  }, [outputPresent]);

  return (
    <div>
      <h1>Checkout Successful</h1>
      {Object.keys(orderInfo).length > 1 && <h2>Thank you {orderInfo.data.name} for your purchase!</h2>}
      {(!loginData && !signedIn) && <p>Your password to sign in and see your previous orders is <b>{generatedPassword}</b></p>}
      {(loginData && !signedIn) && <p>Please use the password and username you already created to see your previous orders</p>}
      {(loginData && signedIn) && <p>Please use the password and username you already created to see your previous orders</p>}
    </div>
  )
}

export default CheckoutSuccessPage;