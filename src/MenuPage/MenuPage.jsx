import { CssBaseline } from "@mui/material";
import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CardImg from "../CardImg/CardImg";
import {customerDetails} from "../Api/adminApi";
import {getMenuItems, getCustomerId, getCustomerData } from  '../Api/Api';

export default function MenuPage({back,admin}) {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);


  const [table_no, setTable_no] = React.useState('1');
  const [customer_id, setCustomer_id] = React.useState('');
  const [customerData, setCustomerData] = React.useState([]);

  const [customers, setCustomers] = useState([]);

    React.useEffect(()=>{
        if(table_no == {} || table_no == null || table_no == ''){
          alert("please select ur table number");
        }
        else{
          getCustomerId({table_no:table_no}).then((data) => {
            setCustomer_id(data.id);
            if(data.id != '' || data != {}){
              getCustomerData({customer_id:data.id}).then((data) => {
                  setCustomerData(data);
                  console.log(data);
              })
            }
          });
        }
  },[]);


  useEffect(()=>{
    getMenuItems().then((data) => {
      setMenuItems(data);
    })

    customerDetails().then((data) => {
      setCustomers(data);
    })

  },[]);

  const handleChange = (e) => {
    setTable_no(e.target.value);
    console.log(e.target.value);
  }

  return ( 
    <>
      <CssBaseline />

      <div style={ { display: 'flex', color: 'white', position: 'relative', background: 'black', justifyContent: 'center' } }>
        { !back && <ArrowBackIcon style={ { position: 'absolute', fontSize: '30px', left: '30px', top: '58px' } } onClick={ () => navigate(-1) } /> }

        <h1 style={ { color: "white", padding: "30px" } }>Menu</h1>
      </div>

      { admin=='false' && <select class="form-select" onChange={handleChange}>
          <option selected>Please select the table number</option>
            {customers?.map((option,i) => (
              <option value={option.table_no}>{option.table_no} : {option.customer_name}</option>
            ))}
      </select>
      }

      <div style={ { background: "#0c0c0d", display: "flex", padding: '15px 15px 60px 15px', flexWrap: "wrap", justifyContent: "center" } }>

        { menuItems?.map((curItem, i) => (
          <CardImg key={ i } {...curItem} customer_id={customer_id}  customerData={customerData} admin={admin}/>
        )) }

      </div>


    </>


  );
}