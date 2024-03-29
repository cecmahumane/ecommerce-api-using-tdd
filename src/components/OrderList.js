import React, { useEffect } from 'react'
import Order from './Order'
import { useOutletContext, Link } from 'react-router-dom'
import { nanoid } from 'nanoid';
import networkManager from '../utilities/NetworkManager';

const OrderList = () => {

    const [sessCart, setSessCart,
        finalOutput, setFinalOutput,
        loginData, setLoginData,
        signedIn, setSignedIn] = useOutletContext();

    const callOrderData = async () => {
        let data = {
            email: loginData.email,
            // email: "cecmahumane@gmail.com"
        }
        try {
            const response = await networkManager.makeRequest("get_customer_order", data);
            console.log(response.data.rows);
            setFinalOutput(response.data.rows);
        } catch (error) {
            console.log(error)
        }
    };

    let allOrders = finalOutput.map((order) => {
        console.log(order)
        return (
            <Order
                key={nanoid()}
                order={order}
            // sessCart={sessCart}
            // setSessCart={setSessCart}
            // finalOutput={finalOutput}
            // setFinalOutput={setFinalOutput}
            // loginData={loginData}
            // setLoginData={setLoginData}

            />
        )
    })

    useEffect(() => {
        callOrderData();
    }, []);


    return (
        <div>
            <div className='orders'>
                <h2>Orders</h2>
                {allOrders}
                {!finalOutput.length && <div>
                    <p>You have no order history.</p>
                    <Link to='/'><div className='continue-shopping'>
                        <p className='continue-shopping-text'>Continue Shopping</p>
                    </div></Link>
                </div>}
            </div>
        </div>
    )
}

export default OrderList