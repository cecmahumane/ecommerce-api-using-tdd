import React from 'react'
import { Link } from 'react-router-dom'

const Header = (props) => {
  // const [signedIn, setSignedIn] = useOutletContext();
  // console.log(props.cartInfo)
  var totalItems = 0;

  try {

    let quantity = (size) => {
      for (const property in size) {
        totalItems += size[property];
      }
    };
    
    let itemSize = (id) => {
      for (const property in id) {
         quantity(id[property])
      }
    };
    
    let itemId = (carts) => {
      for (const productId in carts) {
        itemSize(carts[productId])
      }
    };
   
    itemId(props.cartInfo.data.cart);
  } catch (error) {
    
  }
  return (
    <div className='header'>
        <Link to='/'><div className='logo'>
            <p data-test='logo' className='logo-letter'>S</p>
        </div></Link>
        <h1 data-test='main-header'>ShoesMcgees EStore</h1>
        <div className='cart-and-counter'>
            <p></p>
            <Link to='/login'> <img src="/images/UserCircle.png" className="accounts-image" data-test="accounts-image" alt='' /> </Link>
            {props.signedIn && <div className='login-indicator'></div>}
            <Link to='/cart'><img src="/images/ShoppingCart.png" alt='' className='cart-image' data-test='cart-image'/></Link>
            <div className='cart-counter' data-test='cart-counter'>
                <p className='cart-counter-number' data-test='cart-counter-number'>{totalItems}</p>
            </div>
        </div>
    </div>
  )
}

export default Header