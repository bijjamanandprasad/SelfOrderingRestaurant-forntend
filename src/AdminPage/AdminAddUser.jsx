import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {TextField, Button, Typography } from '@mui/material';
import { CssBaseline, Paper } from "@mui/material";
import { height } from "@mui/system";
import MenuPage from "../MenuPage/MenuPage";

import {addCustomer, customerDetails} from "../Api/adminApi";

import Customers from "../customers/Customers";

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

const AdminPage = () => {

    const [customers, setCustomers] = useState([]);

    const navigate = useNavigate();

    const refreshPage = () => {
        window.location.reload();
      }

    const [item, setItem] = useState({
        table_no:'',
        customer_name:'',
        phone_no:''
    });

    const clear = () => {
        setItem({
            table_no:'',
            customer_name:'',
            phone_no:''
    
        });    
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addCustomer(item).then(data => console.log(JSON.stringify(data)));
        // refreshPage();
        clear();
    }

    useEffect(()=>{
        customerDetails().then((data) => {
            setCustomers(data);
            console.log(data);
        })
    },[]);

    return (
        <>
        <div style={{background:'black',width:"100%",minHeight:'100vh'}}>
            <CssBaseline />
            <div style={ { display: 'flex', color: 'white', position: 'relative', background: 'black', justifyContent: 'center' } }>
                { <ArrowBackIcon style={ { position: 'absolute', fontSize: '30px', left: '30px', top: '58px' } } onClick={ () => navigate(-1) } /> }

                <h1 style={ { color: "white", padding: "30px" } }> Admin Add Customers </h1>
            </div>

            
                <Paper style={ classes.container }>
                    <form autoComplete="off" noValidate onSubmit={ handleSubmit }>
                        <Typography style={ classes.title } variant="h6" >Fill User Details</Typography>
                        <TextField style={ classes.field } type='number' name='table_no' variant='outlined' label="Table Number" fullWidth value={ item.table_no } onChange={ (e) => setItem({ ...item, table_no: e.target.value }) } />
                        <TextField style={ classes.field }  name='customer_name' variant='outlined' label="Customer Name" fullWidth value={ item.title} onChange={ (e) => setItem({ ...item, customer_name: e.target.value }) } />
                        <TextField style={ classes.field }  name='phone_no' variant='outlined' label="Phone number" fullWidth value={ item.phone_no} onChange={ (e) => setItem({ ...item, phone_no: e.target.value }) } />
                        <Button style={ classes.field } variant="contained" color="primary" size="large" type="submit" fullWidth> Add User </Button>
                        <Button style={ classes.field } variant="contained" color="warning" size="small" onClick={ clear } fullWidth> Clear </Button>
                    </form>
                </Paper>
            </div>


            <div style={ { background: "#0c0c0d", display: "flex", padding: '15px 15px 60px 15px', flexWrap: "wrap", justifyContent: "center" } }>
            { customers?.map((curUser, i) => (
                <Customers key={ i } {...curUser}/>
            )) }
            </div>

        </>
    );
}

export default AdminPage;