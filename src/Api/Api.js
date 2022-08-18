import axios from "axios";

const URL = "http://localhost:5000";

export const getMenuItems = async () => {
    try{
        const {data} = await axios.get(URL+"/getMenuItems");
        return data;
    }catch(error){
        console.log(error + "Error while getting the menu items!!!");
    }
}

export const cartItemInsert = async (value) => {
    try{
        const {data} = await axios.put(URL+"/cart",value);
        return data;
    }catch(error){
        console.log(error + "Error while getting the menu items!!!");
    }
}

export const deleteCartItem = async (value) => {
    try{
        const {data} = await axios.post(URL+"/cart/deleteCartItem",value);
        return data;
    }catch(error){
        console.log(error + "Error while deleting the cart item!!!");
    }
}

// Get all Customer Details and cart items
export const getCustomerData = async (customer_id) => {
    try{
        const {data} = await axios.post(URL+"/cart", customer_id);
        return data;
    }catch(error){
        console.log(error + "Error while getting the menu items!!!");
    }
}

// cart item increment
export const incrementItem = async (value) => {
    try{
        const {data} = await axios.patch(URL+"/cart/increment",value);
        return data;
    }catch(error){
        console.log(error + "Increment the cart item");
    }
}
// cart item increment
export const decrementItem = async (value) => {
    try{
        const {data} = await axios.patch(URL+"/cart/decrement",value);
        return data;
    }catch(error){
        console.log(error + "Decrement the cart item");
    }
}


// Get all customerId
export const getCustomerId = async (table_no) => {
    try{
        const {data} = await axios.post(URL+"/cart/customerId", table_no);
        return data;
    }catch(error){
        console.log(error + "Error while getting the menu items!!!");
    }
}


export const setBill = async (value) => {
    try{
        const {data} = await axios.post(URL+"/cart/setBill", value);
        return data;
    }catch(error){
        console.log(error + "Error while getting the menu items!!!");
    }
}
export const submitBill = async (value) => {
    try{
        const {data} = await axios.post(URL+"/cart/submitBill", value);
        return data;
    }catch(error){
        console.log(error + "Error while getting the menu items!!!");
    }
}
export const submitOrder = async (value) => {
    try{
        const {data} = await axios.post(URL+"/cart/submitOrder", value);
        return data;
    }catch(error){
        console.log(error + "Error while getting the menu items!!!");
    }
}