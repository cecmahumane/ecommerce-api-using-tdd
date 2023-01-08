import React, { useEffect } from 'react'
import networkManager from '../utilities/NetworkManager';
import { useOutletContext } from 'react-router-dom'
import { nanoid } from 'nanoid';
import OrderItem from './OrderItem';

const Orders = () => {

    const [loginData, setLoginData, finalOutput, setFinalOutput] = useOutletContext();
    console.log(loginData);
    
    // const callOrderData = async () => {
    //     let data = {
    //         email: loginData.email,
    //         // email: "cecmahumane@gmail.com"
    //     }
    //     try {
    //         const response = await networkManager.makeRequest("get_customer_order", data);
    //         console.log(response.rows[0].order_contents);
    //         setFinalOutput([response.rows[0].order_contents]);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // };

    let grandTotal;
    console.log(finalOutput)

    if (finalOutput) {
        grandTotal = finalOutput.reduce((grandTotal, currentValue) => grandTotal + currentValue.totalItemPrice, 0)
    }

    try {
        console.log(finalOutput)
        var itemList = finalOutput.map((item) => {
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
                />
            )
        })
    } catch (error) {
        console.log(error);
    }

    useEffect(() => {
        // callOrderData();
    }, []);

    return (
        <div>
            <h2>Orders</h2>
            {finalOutput.length > 0 && itemList}
            <div className='subtotal-price-order'>
                <p>Subtotal</p>
                {finalOutput.length > 0 && <p>${grandTotal}.00</p>}
            </div>
        </div>
    )
}

export default Orders