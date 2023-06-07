import React, { useEffect } from 'react'
import Nav from 'react-bootstrap/Nav';
import {NavLink} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, Table } from '@mui/material';
import Navbar from 'react-bootstrap/Navbar'
import './header.css'
import Menu from '@mui/material/Menu';

import { useState } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { DLT } from '../redux/actions/action';
const Header=()=> {


  const[price,setPrice]=useState(0);
  

    const getdata=useSelector((state)=>state.cartreducer.carts);
    
    console.log(getdata);


    const dispatch=useDispatch();




    const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const dlt=(id)=>{
    dispatch(DLT(id))
  }

  const total=()=>{
    let price=0;
    getdata.map((ele,k)=>{
      price=ele.price+ele.qnty+price
    });
    setPrice(price);
  };

  useEffect(()=>{
    total();
  },[total])

  return (
    <div>
     <Navbar bg="dark" variant="dark" className='navbar'>
        <Container>
          <NavLink to="/" className="navlink-1">Add To Cart</NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="navlink-2">Home</NavLink>

          </Nav>
          <Badge badgeContent={getdata.length} color="primary"
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          
          >
         <ShoppingCartIcon sx={{fontSize:35,color:'white'}}/>
          </Badge>
        </Container>

        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >


{
    getdata.length?
    <div className='card_details' style={{width:"24rem", padding:10}}>
        <Table>
            <thead>
                <tr>
                    <th>Photo</th>
                    <th>Restaurant Name</th>
                </tr>
                
                
            </thead>
    
            
            <tbody>
                {
                    getdata.map((e)=>{
                        return(
                            <>
                              <tr>
                              <td> 
                              <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                        
                         
                              <img src={e.imgdata}  style={{width:"5rem",height:"5rem"}}alt=""/>
                                </NavLink>  
                              </td>
                              <td>
                                <p>{e.rname}</p>
                                <p>price: ₹ {e.price}</p>
                                <p>Qunatity: ₹ {e.qnty}</p>
                                <p style={{color:"red",cursor:"pointer",fontSize:20}} onClick={()=>dlt(e.id)}>
                                    <i className='smalltrash' >{<DeleteIcon/>}</i>
                                </p>
                              </td>
                              <td className='mt-5'style={{color:"red",cursor:"pointer",fontSize:20}} onClick={()=>dlt(e.id)}>
                                <i className='largetrash'  >{<DeleteIcon/>}</i>
                              </td>
                                </tr>
                                    </>

                            

                        )
                    })
                }
                <p className='text_center'>
                   Total : ₹ {price} 
                </p>
            </tbody>
        </Table>
    </div>:
    <div className='card_details'>
    <i className="smallclose"  onClick={handleClose} style={{position:"absolute",top:2,right:20,fontSize:23,cursor:"pointer"}}>{<CloseButton />}</i>
        <p>Your Card is Empty</p>
        <img src="https://media2.giphy.com/media/jtECu4KjK3cqiAUMyR/giphy.gif" alt=""  className='img'/>
    </div>
}



      </Menu>
      </Navbar>
    </div>
  )
}

export default Header
