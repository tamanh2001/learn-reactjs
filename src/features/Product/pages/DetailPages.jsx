import React from 'react';

import { Box, Container, Grid,makeStyles,Paper } from '@material-ui/core';
import ProductThumbnail from '../components/ProductThumbnail';
import { useRouteMatch } from 'react-router-dom';
import useProductDetail from '../hooks/useProductDetail';
import ProductInfo from '../components/ProductInfo';
import AddToCartForm from '../components/AddToCartForm';
import ProductMenu from '../components/ProductMenu';


const useStyles=makeStyles(theme =>({
    root:{},
    left:{  
        width:'400px',
        padding: theme.spacing(1.5),
        borderRight:`1px solid ${theme.palette.grey[300]}`,
        
         
    },
    right:{
        flex:'1 1 0' , //chiếm hết độ rộng của th cha
        padding : theme.spacing(1.5),
        
    },
  
}))


function DetailPages() {
    const classes=useStyles();
    const {params:{productId},}//object destructuring nhưng nested 2 tầng
    =useRouteMatch();
    const{product,loading}=useProductDetail(productId);
    if(loading){
        return <Box>Loading</Box>
    }
    const handleAddToCartSubmit=(formValues)=>{
        console.log('Form submit',formValues)
    }
    return (
        <Box >   
            <Container>
                <Paper elevation={0}>

                    <Grid container >
                        <Grid item className={classes.left}>
                             
                             <ProductThumbnail product={product}/>
                         </Grid>
                        <Grid item className={classes.right}> 
                             <ProductInfo product={product}/>
                             <AddToCartForm onSubmit={handleAddToCartSubmit}/>
                        </Grid>
                    </Grid>

                </Paper>
                <ProductMenu/>
            </Container>
        </Box>
    );
}

export default DetailPages;