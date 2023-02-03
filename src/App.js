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
// const cookies = new Cookies();

function App() {
  const [sessCart, setSessCart] = React.useState("");
  const [finalOutput, setFinalOutput] = React.useState([]);
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: ""
});
  const [signedIn, setSignedIn] = React.useState(false);

  console.log(sessCart);
  console.log(finalOutput);

  const fetchCookieSession = async () => {
    try {
      const response = await networkManager.makeRequest("fetch_cookie_session", null)
      console.log(response)
      setSessCart(response);
      console.log("fetch cookie session complete")
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    console.log("app.js refresh")
    fetchCookieSession();
  }, []);

  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <Header 
          cartInfo={sessCart}
          signedIn={signedIn}
          setSignedIn={setSignedIn}
          loginData={loginData}
          setLoginData={setLoginData}
        />
        <Outlet
          context={[sessCart, setSessCart, 
            finalOutput, setFinalOutput, 
            loginData, setLoginData,
            signedIn, setSignedIn
          ]}
        />
      </QueryClientProvider>
    </div>
  );
}

export default App;