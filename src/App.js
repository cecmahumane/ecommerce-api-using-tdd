import './App.css';
import Header from './components/Header';
import { Outlet } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
// import axios from "axios";
import React, {useEffect} from 'react';
import axios from 'axios';
// import ProductPage from './components/ProductPage';

const queryClient = new QueryClient()

function App() {
  const [sessCart, setSessCart] = React.useState("");
  // const [allProductData, setAllProductData] = React.useState("");
  console.log(sessCart);

  let resumeCart = async() => {
    if (sessCart.length === 0) {
      let response = await axios.get(`${process.env.REACT_APP_ORIGIN}/api/session`,
      {
          withCredentials: true,
      }
      )
      console.log(response);
      setSessCart(response)
    }
  }

//   useEffect(() => {
//     resumeCart();
// }, [sessCart]);
  // resumeCart();

  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <Header cartInfo={sessCart}/>
        <Outlet
          context={[sessCart, setSessCart]}
        />
      </QueryClientProvider>
    </div>
  );
}

export default App;