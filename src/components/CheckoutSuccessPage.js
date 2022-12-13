import React from 'react'
import networkManager from '../utilities/NetworkManager';
import { useOutletContext } from 'react-router-dom'
import { useEffect } from 'react';

const CheckoutSuccessPage = () => {

  const [sessCart, setSessCart] = useOutletContext();

  let clearCart = async () => {
    let body = {};
    try {
      const response = await networkManager.makeRequest("empty_cart", body)
      setSessCart(response);
    } catch (error) {
        console.log(error);
    }
  };

  useEffect(() => {
    clearCart();

  }, []);

  return (
    <h1>Checkout Successful</h1>
  )
}

export default CheckoutSuccessPage