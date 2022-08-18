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

import { cartItemInsert, getCustomerId, getCustomerData } from  '../Api/Api'; 
import {menuItemDelete} from "../Api/adminApi";
import { useNavigate } from 'react-router-dom';
 
const CardImg = ({_id,title,description,price,img,category, admin, customer_id, customerData}) => {

  const [isItemInCart, setIsItemInCart] = React.useState(false);

  const navigate = useNavigate();

  const checkItemIsInCart = () => {
      for(let i=0; i<customerData?.cart?.length; i++){
        if(customerData.cart[i].item._id == _id){
          setIsItemInCart(true); 
        } 
    }
  }

  const refreshPage = () => {
    window.location.reload();
  }

  const append = () => {
    cartItemInsert({"customer_id": customer_id,"menu_id":_id}).then((data) => {
      setIsItemInCart(true);
      console.log(JSON.stringify(data));
    })
  }

  const deleteItem = () => {
      menuItemDelete({id:_id}).then((data) => {
        console.log(JSON.stringify(data));
        // refreshPage();
      })
  }

  React.useEffect(()=>{
    checkItemIsInCart(); 
  },[navigate])
 
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
        </CardContent>
        <CardActions >
          { admin=='false' && !isItemInCart && <Button onClick={append} size="small" style={ { fontSize: '10px' } } color='primary'> Add to Cart <AddCircleOutlineIcon /></Button>}
          { admin=='false'  && isItemInCart && <Button size="small" style={ { fontSize: '10px' } } color='primary'> Item is added to cart</Button>}
          { admin=='true' && <Button onClick={deleteItem} size="small" style={ { fontSize: '10px' } } color='primary'> <DeleteIcon /></Button>}
        </CardActions>
      </Card>

    </>
  );
}


export default CardImg;

// https://www.youtube.com/watch?v=YddPHj0AYJM&list=PLwGdqUZWnOp3x69T8d-UeGtEY_LnxvcIi&index=9