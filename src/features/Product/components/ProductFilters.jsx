import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles } from '@material-ui/core';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import { Filter } from '@material-ui/icons';
import FilterByService from './Filters/FilterByService';

ProductFilters.propTypes = {
    filters:PropTypes.object.isRequired,
    onChange: PropTypes.func,
};


function ProductFilters({filters,onChange}) {
    const handleCategoryChange=(newCategoryId)=>{
       if(!onChange) return; 
        
        const newFilters={
            
            'category.id':newCategoryId,
        }
        onChange(newFilters) //filterbycategory gọi lên productfilter bằng hàm handleCategoryChange,
        //sau đó PF gọi lên th cha bằng onChange trong listpage xong lại gọi handleFilterChange,2 tầng từ dưới lên trên
    };
    const handleChange=(values)=>{
        if(onChange){
            onChange(values);
        }


    };
    return (
        <Box>
            <FilterByCategory onChange={ handleCategoryChange}/> 
            <FilterByPrice onChange={handleChange}/>
            <FilterByService filters={filters} onChange={handleChange}/> 
            
        </Box>
    );
}

export default ProductFilters;