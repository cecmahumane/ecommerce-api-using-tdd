import axios from "axios";

const networkManager = {
    async getProductImages() {
        const response = await axios.get(`${process.env.REACT_APP_ORIGIN}/api/products`, {withCredentials: true});
        return response;
    },
    async getProductMatches(body) {
        const response = await axios.post(`${process.env.REACT_APP_ORIGIN}/api/products/match`, body, {withCredentials: true});
        return response;
    },
    async submitData(body) {
        const response = await axios.post(`${process.env.REACT_APP_ORIGIN}/api/profile`, body, {withCredentials: true});
        return response;
    },
    async addNewItemToCart(body) {
        const response = await axios.post(`${process.env.REACT_APP_ORIGIN}/api/cart`, body, {withCredentials: true});
        return response;
    },
    async getSingleProductData(params) {
        const response = await axios.get(`${process.env.REACT_APP_ORIGIN}/api/products/${params.product}`, {withCredentials: true});
        return response;
    },
    async addNewItem(body) {
        const response = await axios.put(`${process.env.REACT_APP_ORIGIN}/api/cart/addNewItem`, body, {withCredentials: true});
        return response;
    },
    async addOneToSize(body) {
        const response = await axios.put(`${process.env.REACT_APP_ORIGIN}/api/cart/addOneToSize`, body, {withCredentials: true});
        return response;
    },
    async addNewSize(body) {
        const response = await axios.put(`${process.env.REACT_APP_ORIGIN}/api/cart/addNewSize`, body, {withCredentials: true});
        return response;
    },
    async checkout(body) {
        const response = await axios.post(`${process.env.REACT_APP_ORIGIN}/api/checkout`, body, {withCredentials: true});
        return response;
    },
    async incrementCartItem(body) {
        const response = await axios.put(`${process.env.REACT_APP_ORIGIN}/api/shoppingCart/plus`, body, {withCredentials: true});
        return response;
    },
    async decrementCartItem(body) {
        const response = await axios.put(`${process.env.REACT_APP_ORIGIN}/api/shoppingCart/minus`, body, {withCredentials: true});
        return response;
    },
    async removeItemFromCart(body) {
        const response = await axios.put(`${process.env.REACT_APP_ORIGIN}/api/shoppingCart/remove`, body, {withCredentials: true});
        return response;
    }
};


export default networkManager