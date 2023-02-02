import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import networkManager from "../utilities/NetworkManager";

const ProductBox = () => {
  const [allProductData, setAllProductData] = React.useState([]);
  const [tshirtImage, setTshirtImage] = React.useState([]);
  const [hoodieImage, setHoodieImage] = React.useState([]);

  // console.log(allProductData)
  // console.log(hoodieImage)

  const getProductImages = async () => {
    try {
      // const response = await networkManager.getProductImages();
      const response = await networkManager.makeRequest("get_product_images", null)
      console.log(response)

      const { data: jsonData } = response;

      // setTshirtImage(jsonData[0].image2);
      // setHoodieImage(jsonData[1].image2);
      setAllProductData(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProductImages();
  }, []);

  const delay = () => {
    if (allProductData.length > 0) {
      return true;
    }
  };

  return (
    <div className="product-box">
      {delay() && (
        <Link to={`products/${allProductData[0].product_name}`}>
          {" "}
          <img
            alt=""
            src='/images/Greytshirt.png'
            className="grey-tshirt"
            data-test="grey-tshirt-image"
          />
        </Link>
      )}
      {delay() && (
        <Link to={`products/${allProductData[1].product_name}`}>
          {" "}
          <img
            alt=""
            src='/images/Greyhoodie.png'
            className="grey-tshirt"
            data-test="grey-hoodie-image"
          />
        </Link>
      )}
      {delay() && (
        <Link to={`products/${allProductData[2].product_name}`}>
          {" "}
          <img
            alt=""
            src='/images/Greyhat.png'
            className="grey-hat"
            data-test="grey-hat-image"
          />
        </Link>
      )}
      {delay() && (
        <Link to={`products/${allProductData[3].product_name}`}>
          {" "}
          <img
            alt=""
            src='/images/Greymug.png'
            className="grey-mug"
            data-test="grey-mug-image"
          />
        </Link>
      )}
    </div>
  );
};

export default ProductBox;
