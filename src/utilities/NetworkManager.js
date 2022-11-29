import axios from "axios";


const networkManager = {
    async makeRequest(name, data) {
        await Promise.all(this.priorityQueue)
        return await this.requestDict[name](data)
    },
    async makePriorityRequest(name, data) {
        let req = this.requestDict[name](data);
        this.priorityQueue.push(req);
        await req;
        let index = this.priorityQueue.findIndex(req);
        this.priorityQueue.splice(index, 1);
        return req;
    },
    priorityQueue: [],
    requestDict: {
        "get_product_images": (data) => {return axios.get(`${process.env.REACT_APP_ORIGIN}/api/products`, {withCredentials: true})},
        
        "get_product_matches": (body) => {return axios.post(`${process.env.REACT_APP_ORIGIN}/api/products/match`, body, {withCredentials: true})},
        
        "submit_data": (body) => {return axios.post(`${process.env.REACT_APP_ORIGIN}/api/profile`, body, {withCredentials: true})},
        
        "add_new_item_to_cart": (body) => {return axios.post(`${process.env.REACT_APP_ORIGIN}/api/cart`, body, {withCredentials: true})},
        
        "get_single_product_data": (params) => {return axios.get(`${process.env.REACT_APP_ORIGIN}/api/products/${params.product}`, {withCredentials: true})},
        
        "add_new_item": (body) => {return axios.put(`${process.env.REACT_APP_ORIGIN}/api/cart/addNewItem`, body, {withCredentials: true})},
        
        "add_one_to_size": (body) => {return axios.put(`${process.env.REACT_APP_ORIGIN}/api/cart/addOneToSize`, body, {withCredentials: true})},
        
        "add_new_size": (body) => {return axios.put(`${process.env.REACT_APP_ORIGIN}/api/cart/addNewSize`, body, {withCredentials: true})},
        
        "checkout": (body) => {return axios.post(`${process.env.REACT_APP_ORIGIN}/api/checkout`, body, {withCredentials: true})},
        
        "increment_cart_item": (body) => {return axios.put(`${process.env.REACT_APP_ORIGIN}/api/shoppingCart/plus`, body, {withCredentials: true})},
        
        "decrement_cart_item": (body) => {return axios.put(`${process.env.REACT_APP_ORIGIN}/api/shoppingCart/minus`, body, {withCredentials: true})},
        
        "remove_item_from_cart": (body) => {return axios.put(`${process.env.REACT_APP_ORIGIN}/api/shoppingCart/remove`, body, {withCredentials: true})}
    },
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