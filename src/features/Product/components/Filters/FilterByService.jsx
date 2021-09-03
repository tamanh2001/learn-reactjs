import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Checkbox, FormControlLabel, makeStyles, TextField, Typography } from '@material-ui/core';

FilterByService.propTypes = {
    filters:PropTypes.object.isRequired,
    onChange: PropTypes.func,
};
const useStyles=makeStyles((theme)=>({
    root:{
        padding:theme.spacing(2),
        borderTop:`1px solid ${theme.palette.grey[300]}`,
       

    },
    list:{
        padding:0,
        margin:0,
        listStyleType:'none',

        '&>li':{
            margin:0,
           
        }
    }

    }))

function FilterByService({filters={},onChange}) {
    
   
    const handleChange=(e)=>{
        if(!onChange) return;
            
        const {name,checked}=e.target;
        onChange({[name]:checked})
        //th cha cho true thì bật true,f thì bật f khi có thay đổi thì báo lên th cha là checkbox này thay đổi
        

    };
    const classes=useStyles();
    return (
        <Box className={classes.root}>
        <Typography variant="subtitle2"> CHỌN DỊCH VỤ </Typography>
        <ul className={classes.list}>
        {[
            {value:'isPromotion',label:'Có khuyến mãi'},
            {value:'isFreeShip',label:'Vận chuyển miễn phí'},
        ].map(service=>(
            <li key={service.value}>
                <FormControlLabel
                control={
                <Checkbox
                     checked={Boolean(filters[service.value])}
                     onChange={handleChange}
                     name={service.value}
                     color="primary"
                 />
        }
        label={service.label}
      />

            </li>
        ))}
        </ul>
       
       
        </Box>
        
    );
}

export default FilterByService;