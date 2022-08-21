import axios from "axios";
import { toast } from "react-toastify";
const URL = "http://localhost:5000";

export const menuPost = async (value) => {
    try{
        const {data} = await axios.post(URL+"/menu" , value);
        return data;

    }catch(error){
        console.log(error + "Menu item insertion error");
    }
}

export const menuItemDelete = async (value) => {
    try{
        const {data} = await axios.post(URL+"/menuItem/delete", value);
        return data;

    }catch(error){
        console.log(error + "Menu item  deletion error");
    }
}

export const addCustomer = async (value) => {
    try{
        console.log(value)
        const {data} = await axios.post(URL+"/customer", value);
        return data;

    }catch(error){
        console.log(error + "Adding the customer is failed");
    }
}

export const deleteCustomer = async (value) => {
    try{
        const {data} = await axios.post(URL+"/cart/deleteCustomer", value);
        return data;

    }catch(error){
        console.log(error + "Adding the customer is failed");
    }
}

export const customerDetails = async () => {
    try{
        const {data} = await axios.get(URL+"/getCustomerDetails");
        return data;

    }catch(error){
        console.log(error + "getting customer details is failed");
    }
}

export const generateError = (error) =>
toast.error(error, {
  position: "bottom-right",
  closeOnClick: true,
});
export const generateSuccess = (error) =>
toast.success(error, {
  position: "bottom-right",
  closeOnClick: true,
});
