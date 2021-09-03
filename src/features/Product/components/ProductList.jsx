import { Box, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import Product from './Product';

ProductList.propTypes = {
    data:PropTypes.array,
    
};
ProductList.defaultProps ={
    data:[],
}

function ProductList({data}) {
    return ( //không nên lấy index là key vì số lượng có thể thay đổi nhưng trong grid số lượng không thay đổi
        <Box>   
            <Grid container>    
                {data.map((product)=>(
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}> 
                        <Product product ={product}/>
                    </Grid>
                ))}
            
            </Grid>
        </Box>
    );
}

export default ProductList;