import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

import { cartItemInsert, setBill, getCustomerId, getCustomerData, deleteCartItem, incrementItem, decrementItem } from  '../Api/Api'; 
import {menuItemDelete} from "../Api/adminApi";
 
const CartItem = ({_id,title,description,price,payment,setPayment,img,category,amount, cartId, count}) => {

  const [table_no, setTable_no] = React.useState('1');
  const [customer_id, setCustomer_id] = React.useState('');
  const [customerData, setCustomerData] = React.useState([]);


  const refreshPage = () => {
    window.location.reload();
  }

  const append = () => {
    cartItemInsert({"customer_id": customer_id,"menu_id":_id}).then((data) => {
      console.log(JSON.stringify(data));
    })
  }

  const deleteItem = () => {
        deleteCartItem({customer_id:customer_id,cart_item_id:cartId}).then((data) => {
        console.log(JSON.stringify(data) + "deleeeeted");
        refreshPage();
      })
  }

    let [num, setNum]= React.useState(count);
    let incNum = ()=>{
        incrementItem({customer_id:customer_id,cart_item_id:cartId}).then((data) => {
           setNum(Number(data.count));
           let total_amount = payment.amount + price;
           setPayment({...payment,amount: total_amount});
          //  setBill({customer_id:customer_id, bill:  price*data.count}).then((data)=>{
          //     console.log(data);
          //  })
          })

    };
    let decNum = () => {  
      if(num > 1){
        decrementItem({customer_id:customer_id,cart_item_id:cartId}).then((data) => {
          setNum(Number(data.count));
          let total_amount = payment.amount - price;
          setPayment({...payment,amount: total_amount});
          //   setBill({customer_id:customer_id, bill:  price*data.count}).then((data)=>{
          //     console.log(data);
          // });
        })
      }
    }
    let handleChange = (e)=>{
    setNum(e.target.value);
    }

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
              })
            }
          });
        }
  },[]);



  return (

    <>
      <Card sx={ {width:345, maxWidth: 345, margin: '10px' } }>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          width="345"
          sx={{objectFit:'fill'}}
          image={img}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="body1" color="text.primary">
            Rs. {price}/-
          </Typography>
          <Typography variant="body1" color="text.primary">
            count : {num}
          </Typography>
          <Typography variant="body1" color="text.primary">
            Amount : {price * num}
          </Typography>
        </CardContent>
        <CardActions > 

        <div className="col-xl-1" style={{width:"120px"}}>
            <div class="input-group">
                <div class="input-group-prepend">
                    <button class="btn btn-outline-primary" type="button" onClick={decNum}>-</button>
                </div>
                <input type="text" class="form-control" value={num} onChange={handleChange}/>
                <div class="input-group-prepend">
                    <button class="btn btn-outline-primary" type="button" onClick={incNum}>+</button>
                </div>
            </div>
        </div>
          <Button onClick={deleteItem} size="small" style={ { fontSize: '10px' } } color='primary'> <DeleteIcon /></Button>
        </CardActions>
      </Card>

    </>
  );
}


export default CartItem;