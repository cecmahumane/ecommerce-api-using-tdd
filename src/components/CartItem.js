import React, {useEffect} from 'react'
import axios from 'axios';
import networkManager from '../utilities/NetworkManager';

const CartItem = (props) => {
    
    let increment = async () => {
        if (props.quantity > 0) {
            let body = {
                size: props.size,
                quantity: props.quantity,
                id: props.id
            };
            const incrementItem = await networkManager.makeRequest("increment_cart_item", body);
            console.log(incrementItem);
            props.setSessCart(incrementItem);
        } 
    }
    
    let decrement = async() => {
        if (props.quantity > 1) {
            let body = {
                size: props.size,
                quantity: props.quantity,
                id: props.id
            };
            const decrementItem = await networkManager.makeRequest("decrement_cart_item", body);
            console.log(decrementItem);
            props.setSessCart(decrementItem);
        } 
    }

    let remove = async() => {;
        let body = {
            size: props.size,
            quantity: props.quantity,
            id: props.id
        };
        const removeItem = await networkManager.makeRequest("remove_item_from_cart", body);
        console.log(removeItem);
        props.setSessCart(removeItem);
    }

    useEffect(() => {
        
    }, [props.sessCart]);

    return (
        <div>
            <div className='cart-tile'>
                <div className='image-and-description'>
                    <div>
                        <img alt='an item of clothing' src={props.image} />
                    </div>
                    <div>
                        <p>{props.productName}</p>
                        <p>{props.size}</p>
                        <p>{props.price}</p>
                    </div>
                </div>
                <div className='quantity-price'>
                    <div className='minus-quantity-plus'>
                        <div>
                            <img alt='minus sign' src={"/images/Minus.png"} onClick={decrement}/>
                        </div>
                        <div>
                            <p>{props.quantity}</p>
                        </div>
                        <div>
                            <img alt='plus sign' src={"/images/Plus.png"} onClick={increment}/>
                        </div>
                    </div>
                    <div className='price-remove'>
                        <p>${props.totalItemPrice}.00</p>
                        <img alt='remove sign' src={"/images/X.png"} onClick={remove}/>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default CartItem