import React from 'react'

const OrderItem = (props) => {
    
    return (
        <div>
            <div className='cart-tile'>
                <div className='image-and-description'>
                    <div>
                        <img alt='an item of clothing' src={props.image} />
                    </div>
                    <div>
                        <p>Product Name: <b>{props.productName}</b></p>
                        <p>Size: <b>{props.size}</b></p>
                        <p>Price: <b>${props.price}.00</b></p>
                        <p>Quantity: <b>{props.quantity}</b></p>
                        <p>Total Item Price: <b>${props.totalItemPrice}.00</b></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderItem