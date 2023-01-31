import React from 'react'
import { nanoid } from 'nanoid';
import OrderItem from './OrderItem';

const Order = (props) => {
    let orderContents = JSON.parse(props.order.order_contents)
    let grandTotal;
    console.log(orderContents)

    if (props.order.order_contents) {
        grandTotal = orderContents.reduce((grandTotal, currentValue) => grandTotal + currentValue.totalItemPrice, 0)
    }

    let itemList = orderContents.map((item) => {
        console.log(item)
        return (
            <OrderItem
                key={nanoid()}
                productName={item.productName}
                price={item.price}
                size={item.size}
                quantity={item.quantity}
                image={item.image}
                totalItemPrice={item.totalItemPrice}
                id={item.id}
                stripeId={item.stripeId}
            // finalOutput={finalOutput}
            />
        )
    })


    return (
        <div>
            {orderContents.length > 0 && itemList}
            <div className='subtotal-price-order'>
                <p>Subtotal</p>
                {orderContents.length > 0 && <p>${grandTotal}.00</p>}
            </div>
            <hr/>
        </div>
    )
}

export default Order