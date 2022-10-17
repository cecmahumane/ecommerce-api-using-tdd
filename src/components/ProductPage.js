import React from 'react'
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import axios from "axios";

const ProductPage = (props) => {
    const params = useParams();
    // console.log(params)
    // props.setProductParams(params.product);
    const navigate = useNavigate();
    const [sessCart, setSessCart] = useOutletContext();
    const [sizeAlert, setSizeAlert] = React.useState(false);
    const [productData, setProductData] = React.useState({
        size: "",
        quantity: 1,
        productName: params.product
    })
    // console.log(productData);

    const getProductData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_ORIGIN}/api/products/${params.product}`,
                {
                    withCredentials: true,
                });
            //   console.log(response);
            return response.data;
        } catch (err) {
            console.error(err.message)
        }
    }
    
    const addToCart = async () => {
        try {
            const body = productData;
            if (body.size === "") {
                return setSizeAlert(true);
            }
            setSizeAlert(false);
            // addProductToCart();
            const response = await axios.post(`${process.env.REACT_APP_ORIGIN}/api/cart`, body, { withCredentials: true });
            if(response.status === 201) {
                console.log("Item successfully added to cart");
                console.log(response)
            }
            console.log(response);
            setSessCart(response);
        } catch (err) {
            console.error(err.message);
        }
    }

    if (productData.size === "") {

    }

    if (!('product' in params)) {
        navigate('/');
    }

    const query = useQuery(['products'], getProductData);

    if (query.status === "loading") {
        return <div>Loading...</div>
    }

    if (query.status === "error") {
        return <div>Error</div>
    }

    if (query.data.rows.length === 0) {
        return <div>Page not found</div>
    }

    // console.log(query.data.rows[0].image2)

    const handleSubmit = (event) => {
        event.preventDefault()
        // console.log(event)
        // setProductData(event.target.value)
    }

    const handleChange = (event) => {
        setProductData(prevProductData => {
            return {
                ...prevProductData,
                [event.target.name]: event.target.value
            }
        })
    }

    const htmlString = query.data.rows[0].product_description;

    return (
        <div className='container'>
            <img src={query.data.rows[0].image1} className='tshirt' data-test='tshirt-image' alt='' />
            <div className='specs'>
                <div dangerouslySetInnerHTML={{ __html: htmlString }} />
                <form onSubmit={handleSubmit}>
                    <select
                        id='size'
                        data-test='size-drop-down'
                        value={productData.size}
                        onChange={handleChange}
                        name="size"
                    >
                        <option value="">-- Choose Size --</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                    <br />
                    <br />
                    {sizeAlert && <div>
                        <p data-test='size-alert' className='size-alert'>Please choose a size</p>
                        <br />
                    </div>}
                    <button data-test='add-to-cart' onClick={addToCart}>Add to Cart</button>
                </form>
            </div>
        </div>
    )
}

export default ProductPage