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
        
        "remove_item_from_cart": (body) => {return axios.put(`${process.env.REACT_APP_ORIGIN}/api/shoppingCart/remove`, body, {withCredentials: true})},

        "fetch_cookie_session": (data) => {return axios.get(`${process.env.REACT_APP_ORIGIN}/api/session`, {withCredentials: true})},

        "empty_cart": (body) => {return axios.put(`${process.env.REACT_APP_ORIGIN}/api/shoppingCart/emptyCart`, body, {withCredentials: true})},

        "get_order_info": (data) => {return axios.get(`${process.env.REACT_APP_ORIGIN}/api/checkout/success`, {params: data}, {withCredentials: true})},

        "create_checkout_profile": (body) => {return axios.post(`${process.env.REACT_APP_ORIGIN}/api/profile/checkoutProfile`, body, {withCredentials: true})},

        "write_to_order_table": (body) => {return axios.post(`${process.env.REACT_APP_ORIGIN}/api/checkout/checkoutOrder`, body, {withCredentials: true})},

        "get_user_id": (data) => {return axios.get(`${process.env.REACT_APP_ORIGIN}/api/profile/userId`, {withCredentials: true})},

        "verify_login_data": (data) => {return axios.get(`${process.env.REACT_APP_ORIGIN}/api/profile/verifyUser`, {params: data},{withCredentials: true})},

        "get_customer_order": (data) => {return axios.get(`${process.env.REACT_APP_ORIGIN}/api/orders`, {params: data}, {withCredentials: true})},

    }
};


export default networkManager;