import './App.css';
import Header from './components/Header';
import { Outlet } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
// import axios from "axios";
import React, { useEffect } from 'react';
import axios from 'axios';
// import ProductPage from './components/ProductPage';
import Cookies from 'universal-cookie';
import networkManager from './utilities/NetworkManager';

const queryClient = new QueryClient()
const cookies = new Cookies();

function App() {
  const [sessCart, setSessCart] = React.useState("");
  // const [allProductData, setAllProductData] = React.useState("");
  console.log(sessCart);

  // networkManager.addRequired();

  // const cookies = new Cookies();
  console.log(cookies.getAll())

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