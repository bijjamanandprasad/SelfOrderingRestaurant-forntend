import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {submitBill} from "../Api/Api";
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteCustomer } from '../Api/adminApi';


import { generateError, generateSuccess} from "../Api/adminApi";
import { ToastContainer } from "react-toastify";

const Customers = (props) => {
// {_id, table_no, customer_name, order_status, phone_no,bill, bill_status, }

    const deleteUser = () => {
        deleteCustomer({customer_id: props._id}).then((data) => {
          if(data?.error_msg){generateError(data.error_msg);}
          else if(data?.error){generateError(data.error);}
          else{
              generateSuccess("User is deleted Sucessfully !");
          }
      
        })
    }

    const payTheBill = () => {
      submitBill({customer_id: props._id}).then((data) => {
        console.log("Bill is paid");
        if(data?.error_msg){generateError(data.error_msg);}
        else if(data?.error){generateError(data.error);}
        else{
            generateSuccess("Bill status is updated as paid !");
        }
    
      })
    }

 
  return (
    <>
      <Card sx={ {width:345, maxWidth: 345, margin: '10px' } }>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Table Number : {props.table_no}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Customer Name : {props.customer_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Mobile Number : {props.phone_no}
          </Typography>

          {
            props.order_status !== "Not Booked" && <div>
              <Typography variant="body2" color="text.secondary">
                        Items in Cart : 
                    </Typography>

                    { props.cart?.map((curItem, i) => (
                    <Typography style={{ fontWeight: 600 }} key={i} variant="body2" color="text.secondary">
                        {curItem.count} {curItem.item.title} {curItem.item.price * curItem.count}
                      </Typography>
                    )) }

            </div>
          }
          
          <Typography variant="body2" color="text.secondary">
            Bill : {props.bill}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Order Status : {props.order_status}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Bill Status : {props.bill_status}
          </Typography>
        </CardContent>
        <CardActions >
           <Button onClick={deleteUser} size="small" style={ { fontSize: '10px' } } color='primary'> <DeleteIcon /></Button>
           <Button onClick={payTheBill} size="small" style={ { fontSize: '16px' } } color='primary'> Paid </Button>
        </CardActions>
      </Card>
      <ToastContainer />

    </>
  );
}


export default Customers;