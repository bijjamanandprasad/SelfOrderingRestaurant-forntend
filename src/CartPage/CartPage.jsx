import { CssBaseline, Paper } from "@mui/material";
import React,{useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "./CartItem";

import {TextField, Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {getCustomerData,submitOrder, getCustomerId} from "../Api/Api";

import { generateError, generateSuccess} from "../Api/adminApi";
import { ToastContainer } from "react-toastify";

const classes = {
    container:{
        width:"520px",
        padding:"20px",
        margin:"30px auto" 
    },
    title:{
        paddingBottom:'10px'
    },
    field:{
        marginBottom:'10px'
    }
}

export default function CartPage() {

    const navigate = useNavigate();

    const [table_no, setTable_no] = useState('1');
    const [customer_id, setCustomer_id] = useState('');
    const [customerData, setCustomerData] = useState([]);
    

    const [payment, setPayment] = useState({
        uname:'',phone_no:'',table_no:'',amount:''
    });

    const clear = () => {
        setPayment({uname:'',phone_no:'',table_no:'',amount:''});    
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        submitOrder({customer_id: customer_id, bill: payment.amount}).then((data) => {
            console.log(data);
            if(data?.error_msg){generateError(data.error_msg);}
            else if(data?.error){generateError(data.error);}
            else{
                generateSuccess("Your orders is submitted Successfully !");
            }
        });
        clear();
    }


 
    useEffect(()=>{
        if(table_no === {} || table_no === null || table_no === ''){
          alert("please select ur table number");
        }
        else{
          getCustomerId({table_no:table_no}).then((data) => {
            setCustomer_id(data.id);

            console.log(JSON.stringify(data));
            if(data.id !== '' || data !== {}){
                getCustomerData({customer_id:data.id})
                .then((data) => {
                    var total_bill = 0;
                    for(let i=0; i<data?.cart?.length; i++){
                        // if(customerData.cart[i].item._id == _id){
                        //   setIsItemInCart(true); 
                        // } 
                        total_bill += data.cart[i].count*data.cart[i].item.price;
                    }
                    data.bill = total_bill;
                    return data;
                })
                .then((data) => {
                    setCustomerData(data);
                    setPayment({uname:data.customer_name,phone_no: data.phone_no,table_no:data.table_no,amount:data.bill})
                })
                .catch(error=>{
                    console.log("Error in CartPage at line 74");
                })
            }
          });
        }
  },[]);


  return (
   <> 
    <CssBaseline />

    <div style={ { display: 'flex', color: 'white', position: 'relative', background: 'black', justifyContent: 'center' } }>
     <ArrowBackIcon style={ { position: 'absolute', fontSize: '30px', left: '30px', top: '58px' } } onClick={ () => navigate(-1) } /> 
    <h1 style={ { color: "white", padding: "30px" } }>Cart Items</h1>
    </div>

    <div style={ { background: "#0c0c0d", display: "flex", padding: '15px 15px 60px 15px', flexWrap: "wrap", justifyContent: "center" } }>
     { customerData?.cart?.map((curItem, i) => (    
            <CartItem key={i} {...curItem.item} setPayment={setPayment} payment={payment} cartId={curItem._id} count={curItem.count} />
     )) }
     </div>


     <div style={{display:'flex',color:'white',position:'relative',background:'black',justifyContent:'center'}}>
      <h1 style={{color:"white",padding:"30px"}}>Book Your Order</h1>
    </div>
    <div style={{background:'black',width:"100%",display:'flex',justifyContent:'center'}}>
    <Paper style={classes.container}>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Typography style={classes.title} variant="h6" >Book it</Typography>
            <TextField style={classes.field} name='uname' variant='outlined' label="Name" fullWidth value={payment.uname} onChange={(e)=> setPayment({...payment,uname: e.target.value})}/>
            <TextField style={classes.field} name='phone_no' variant='outlined' label="Phone Number" fullWidth value={payment.phone_no} onChange={(e)=> setPayment({...payment,phone_no: e.target.value})}/>
            <TextField style={classes.field} name='table_no' variant='outlined' label="Table Number" fullWidth value={payment.table_no} onChange={(e)=> setPayment({...payment,table_no: e.target.value})}/>
            <TextField style={classes.field} name='amount' variant='outlined' label="Total Bill" fullWidth value={payment.amount} onChange={(e)=> setPayment({...payment,amount: e.target.value})}/>
            <Button style={classes.field} variant="contained" color="primary" size="large" type="submit" fullWidth> Book </Button>
            <Button style={classes.field} variant="contained" color="warning" size="small" onClick={clear} fullWidth> Clear </Button>
        </form>
     </Paper>
    </div>
    <ToastContainer />
   </>


  );
}