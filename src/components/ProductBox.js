import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const ProductBox = () => {
    
    const [allProductData, setAllProductData] = React.useState([])
    const [tshirtImage, setTshirtImage] = React.useState([]);
    const [hoodieImage, setHoodieImage] = React.useState([])

    // console.log(allProductData)
    // console.log(hoodieImage)
    
    const getProductImages = async () => {
        try{
            const response = await fetch(`${process.env.REACT_APP_ORIGIN}/api/products`);
            const jsonData = await response.json();

            setTshirtImage(jsonData[0].image2);
            setHoodieImage(jsonData[1].image2);
            setAllProductData(jsonData);
        } catch (err) {
            console.error(err.message)
        }
    };

    useEffect(() => {
        getProductImages();
    }, []);

    const delay = () => {
        if (allProductData.length > 0) {
            return true
        } 
    }

    return (
    <div className='product-box'>
        {delay() && <Link to={`/${allProductData[0].product_name}`}> <img alt='' src={tshirtImage} className='grey-tshirt' data-test='grey-tshirt-image'/></Link>}
        {delay() && <Link to={`/${allProductData[1].product_name}`}> <img alt='' src={hoodieImage} className='grey-tshirt' data-test='grey-hoodie-image'/></Link>}
    </div>
  )
}


export default ProductBox