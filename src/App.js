import './App.css';
import Header from './components/Header';
import { Outlet } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
// import axios from "axios";
import React, { useEffect } from 'react';
import axios from 'axios';
// import ProductPage from './components/ProductPage';
import NetworkManager from './utilities/NetworkManager';

const queryClient = new QueryClient()

function App() {
  const [sessCart, setSessCart] = React.useState("");
  // const [allProductData, setAllProductData] = React.useState("");
  console.log(sessCart);

  // let resumeCart = async () => {
  //   let body = sessCart;
  //   let response = await axios.post(`${process.env.REACT_APP_ORIGIN}/api/session`, body,
  //     {
  //       withCredentials: true,
  //     }
  //   )
  //   console.log(response);
  //   setSessCart(response)

  // };
  

  //   useEffect(() => {
  //     resumeCart();
  // }, [sessCart]);
  // resumeCart();

  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <Header cartInfo={sessCart} />
        <Outlet
          context={[sessCart, setSessCart]}
        />
      </QueryClientProvider>
    </div>
  );
}

export default App;