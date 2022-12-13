import React, { useEffect } from 'react'
import CartItem from './CartItem';
import { useLocation, useOutletContext } from 'react-router-dom'
import { nanoid } from 'nanoid';
import networkManager from '../utilities/NetworkManager';

const ShoppingCart = () => {
    const [sessCart, setSessCart] = useOutletContext();
    // const [cartArray, setCartArray] = React.useState([]);
    const [finalOutput, setFinalOutput] = React.useState([]);
    console.log(sessCart);

    // let location = useLocation();

    let itemId = async (carts) => {
        let cartArr = [];
        for (const productId in carts) {
            cartArr.push(parseInt(productId));
        }
        console.log(cartArr);
        // setCartArray(cartArr);
        await getProductMatches(cartArr);
    };

    const getProductMatches = async (cartArray) => {
        let body = cartArray;
        console.log(body);
        try {
            const response = await networkManager.makeRequest("get_product_matches", body)

            console.log(response.data);
            formatItemList(response.data)
            // setMatchedProductData(response.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        // setFinalOutput([]);
        if (sessCart.data) {
        itemId(sessCart.data.cart);
        console.log('useEffect Triggered');
        console.log(sessCart);
        }
        
    }, [sessCart]);

    let output = [];
    let formatItemList = (matchedProductData) => {
        matchedProductData.forEach(dbItem => {
            let cartItem = sessCart.data.cart[dbItem.id];
            // if(finalOutput.length < 1) {
            //setFinalOutput(sizeInCartItem(cartItem, dbItem)) //sizeInCartItem(cartItem, output, dbItem)
            // }
            // setFinalOutput((prevState) => [...prevState, ...sizeInCartItem(cartItem, dbItem)])
            output.push(...sizeInCartItem(cartItem, dbItem))
        })

        console.log(output);
        setFinalOutput(output)
        // return output;
    }

    let sizeInCartItem = (itemsFromCart, dbProduct) => {
        let arr = [];
        for (const size in itemsFromCart) {
            arr.push(
                {
                    id: dbProduct.id,
                    productName: dbProduct.product_name,
                    price: dbProduct.unit_price,
                    image: dbProduct.image3,
                    size: size,
                    quantity: itemsFromCart[size].quantity,
                    totalItemPrice: parseInt(dbProduct.unit_price) * parseInt(itemsFromCart[size].quantity),
                    stripeId: dbProduct.stripe_item_id
                }
            )
        }
        console.log(arr)
        return arr;
    };
    let grandTotal;
    console.log(finalOutput)

    if (finalOutput) {
        grandTotal = finalOutput.reduce((grandTotal, currentValue) => grandTotal + currentValue.totalItemPrice, 0)
    }


    try {
        console.log(finalOutput)
        var itemList = finalOutput.map((item) => {
            return (
                <CartItem
                    setSessCart={setSessCart}
                    sessCart={sessCart}
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

    // console.log(cartArray);
    // console.log(allProductData);

    const checkout = async () => {
        console.log(finalOutput)
        let body = finalOutput
        console.log(body)
        // const response = await networkManager.checkout(body);
        const response = await networkManager.makeRequest("checkout", body);
        console.log(response)
        if(response.data.url) {
            window.location.assign(response.data.url)
        }
    };

    return (
        <div className='shopping-cart'>
            <h2>Shopping Cart</h2>
            {finalOutput.length > 0 && itemList}
            {finalOutput.length > 0 && <div>
                <div className='subtotal-price'>
                    <p>Subtotal</p>
                    {finalOutput.length > 0 && <p>${grandTotal}.00</p>}
                </div>
                <div className='checkout' onClick={checkout}>
                    <p className='checkout-text'>Checkout</p>
                </div>
            </div>}
            {itemList.length === 0 && <h3>Your Cart Is Empty</h3>}
        </div>
    )
}

export default ShoppingCart;