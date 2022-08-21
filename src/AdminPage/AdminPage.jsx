import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {TextField, Button, Typography } from '@mui/material';
import { CssBaseline, Paper } from "@mui/material";

import MenuPage from "../MenuPage/MenuPage";

import {menuPost, generateError, generateSuccess} from "../Api/adminApi";
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

const AdminPage = () => {
    const navigate = useNavigate();
    const refreshPage = () => {
        window.location.reload();
      }
    const [item, setItem] = useState({
        title:'',
        description:'',
        price:'',
        img:[],
        category:'',
        amount:''

    });

    const clear = () => {
        setItem({
            title:'',
            description:'',
            price:'',
            img:[],
            category:'',
            amount:''
    
        });    
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        menuPost(item).then(data => {
            console.log(JSON.stringify(data));
            if(data?.error){generateError(data.error);}
            else{
                generateSuccess("Menu Item is added Successfully !");
                // refreshPage();
            }
        });
        
        clear();
    }

    return (
        <>
        <div style={{background:'black',width:"100%",minHeight:'100vh'}}>
            <CssBaseline />
            <div style={ { display: 'flex', color: 'white', position: 'relative', background: 'black', justifyContent: 'center' } }>
                { <ArrowBackIcon style={ { position: 'absolute', fontSize: '30px', left: '30px', top: '58px' } } onClick={ () => navigate(-1) } /> }

                <h1 style={ { color: "white", padding: "30px" } }> Admin </h1>
            </div>

            
                <Paper style={ classes.container }>
                    <form autoComplete="off" noValidate onSubmit={ handleSubmit }>
                        <Typography style={ classes.title } variant="h6" >Add the Menu Items</Typography>
                        <TextField style={ classes.field }  name='Item name' variant='outlined' label="Item name" fullWidth value={ item.title} onChange={ (e) => setItem({ ...item, title: e.target.value }) } />
                        <TextField style={ classes.field }  name='Description' variant='outlined' label="Description" fullWidth value={ item.description} onChange={ (e) => setItem({ ...item, description: e.target.value }) } />
                        <TextField style={ classes.field } type='number' name='price' variant='outlined' label="Price" fullWidth value={ item.price } onChange={ (e) => setItem({ ...item, price: e.target.value }) } />
                        <TextField style={ classes.field }  name='Category' variant='outlined' label="Category" fullWidth value={ item.category} onChange={ (e) => setItem({ ...item, category: e.target.value }) } />
                        <TextField style={ classes.field }  name='img' variant='outlined' label="Img_url" fullWidth value={ item.img} onChange={ (e) => setItem({ ...item, img: [e.target.value] }) } />
                        <TextField style={ classes.field } type='number' name='amount' variant='outlined' label="Amount" fullWidth value={ item.amount } onChange={ (e) => setItem({ ...item, amount: e.target.value }) } />
                        <Button style={ classes.field } variant="contained" color="primary" size="large" type="submit" fullWidth> Add Item </Button>
                        <Button style={ classes.field } variant="contained" color="warning" size="small" onClick={ clear } fullWidth> Clear </Button>
                    </form>
                </Paper>
            </div>

            <MenuPage back='false' admin="true" />
        <ToastContainer />
        </>
    );
}

export default AdminPage;