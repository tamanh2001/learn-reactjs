import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box,  makeStyles,  Typography } from '@material-ui/core';
import { useState } from 'react';
import categoryApi from 'api/categoryApi';

const useStyles = makeStyles((theme)=>({
    root:{
        padding:theme.spacing(2),
        
    },
    menu:{
        padding:0,
        margin:0,
        listStyleType:'none',
        
        '&>li':{
            marginTop:theme.spacing(1),
            
            '&:hover':{
                cursor:'pointer',
                color:theme.palette.primary.main,
            },
        
        },
        
    },
}));
FilterByCategory.propTypes = {
    onChange : PropTypes.func,
};
function FilterByCategory({onChange}) {
    const classes=useStyles()
    const[categoryList,setCategoryList]=useState([])
    useEffect(()=>{
        (async()=>{
            try {
                const list =await categoryApi.getAll()
                setCategoryList(list.map(x=>({
                    id:x.id,
                    name:x.name,

                })))
                
            } catch (error) {
                console.log('Failed to catch category list:',error)
                
            }
        })();
    },[]);
    const handleCategoryClick=(category)=>{
        if(onChange){
            onChange(category.id)
        }
        //khi được click thì kiểm tra onChange nếu có thay đổi thì báo lên onChange cái category id mới

    };
    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">DANH MỤC SẢN PHẨM </Typography>
            <ul className={classes.menu}> 
                {categoryList.map((category) => (
                <li key={category.id} onClick={()=>handleCategoryClick(category)}>
                    <Typography variant="body2">{category.name}</Typography>
                    
                </li>))}
            </ul>
        </Box>
    );
}

export default FilterByCategory;