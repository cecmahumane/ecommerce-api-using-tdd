import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './components/Login';
import Register from './components/Register';
import ProductBox from './components/ProductBox';
import ProductPage from './components/ProductPage';
import ShoppingCart from './components/ShoppingCart';
import CheckoutCancelPage from './components/CheckoutCancelPage';
import CheckoutSuccessPage from './components/CheckoutSuccessPage'; 
// import Product from './components/Product';
// import Redirect from './components/Redirect';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="success" element={<CheckoutSuccessPage />} />
          <Route path="cancel" element={<CheckoutCancelPage />} />
          <Route path="login" element={<Login />} />
          <Route path="cart" element={<ShoppingCart />} />
          <Route path="register" element={<Register />} />
          {/* <Route path=":product" element={<ProductPage />}/> */}
          <Route path="products" element={<ProductPage />}>
            <Route path=":product" element={<ProductPage />}/>
          </Route>
          <Route index element={<ProductBox/>} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>  
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
