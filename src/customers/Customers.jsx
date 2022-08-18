import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {submitBill} from "../Api/Api";
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteCustomer } from '../Api/adminApi';

const Customers = ({_id, table_no, customer_name, order_status, phone_no,bill, bill_status}) => {

    const deleteUser = () => {
        deleteCustomer({customer_id: _id}).then((data) => {
            window.location.reload();
        })
    }

    const payTheBill = () => {
      submitBill({customer_id: _id}).then((data) => {
        console.log("Bill is paid");
      })
    }

  return (
    <>
      <Card sx={ {width:345, maxWidth: 345, margin: '10px' } }>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Table Number : {table_no}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Customer Name : {customer_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Mobile Number : {phone_no}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Bill : {bill}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Order Status : {order_status}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Bill Status : {bill_status}
          </Typography>
        </CardContent>
        <CardActions >
           <Button onClick={deleteUser} size="small" style={ { fontSize: '10px' } } color='primary'> <DeleteIcon /></Button>
           <Button onClick={payTheBill} size="small" style={ { fontSize: '16px' } } color='primary'> Paid </Button>
        </CardActions>
      </Card>


    </>
  );
}


export default Customers;