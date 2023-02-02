import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = (props) => {
  const navigate = useNavigate();
  // console.log(props.cartInfo)
  var totalItems = 0;

  const handleSignOut = () => {
    props.setSignedIn(false);
    navigate('/');

  }; 

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
            <p data-test='logo' className='logo-letter'>C</p>
        </div></Link>
        <Link to='/'><h1 data-test='main-header'>Cecil's E-Commerce Store</h1></Link>
        <div className='cart-and-counter'>
            {props.signedIn && <p className='sign-out' onClick={handleSignOut}><u>Sign Out</u></p>}
            {!props.signedIn && <Link to='/login'> <img src="/images/UserCircle.png" className="accounts-image" data-test="accounts-image" alt='' /> </Link>}
            {props.signedIn && <Link to='/orders'> <img src="/images/UserCircle.png" className="accounts-image" data-test="accounts-image" alt='' /> </Link>}
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