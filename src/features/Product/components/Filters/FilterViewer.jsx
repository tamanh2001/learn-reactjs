import { Box, Chip, makeStyles } from '@material-ui/core';
import { CreateNewFolderOutlined, FilterSharp } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useMemo } from 'react';

FilterViewer.propTypes = {
    filters:PropTypes.object.isRequired,
    onChange: PropTypes.func,
};
const useStyles=makeStyles(theme=>({
    root:{
        padding:0,
        display:'flex',
        flexFlow:'row wrap',
        alignItems:'center',
        listStyleType:'none',
        margin:theme.spacing(2,0),
        '&>li':{
            margin:0,
            padding:theme.spacing(1),

        }

    }
}))
const FILTER_LIST=[
    {
    id:1,
    getLable: ()=>'Giao hàng miễn phí' ,
    isActive: (filters) => filters.isFreeShip, //chỉ active khi th này bằng true
    isVisible: (filters) => true, 
    isRemovable: false, //không remove được chỉ toggle được(click vào hiển thị active
    onRemove: () => {}, //nên không thực hiện remove
    onToggle: (filters) =>{
        const newFilters={...filters}
        if(newFilters.isFreeShip){
            delete newFilters.isFreeShip;
        }else{
            newFilters.isFreeShip=true;
        }

        return newFilters
    }, 
},
{
    id:2,
    getLable:()=>'Có khuyến mãi',
    isActive: ()=>true ,
    isVisible: (filters) => Object.keys(filters).includes('isPromotion') ,
    isRemovable: true,
    onRemove:(filters)=>{
        const newFilters = {...filters}
        delete newFilters.isPromotion;
        return newFilters;
    } ,
    onToggle:()=>{} ,
},
{
    id:3 ,
    getLable:(filters)=>`Từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
    isActive:(filters)=>true ,
    isVisible:(filters)=>Object.keys(filters).includes('salePrice_lte')&&Object.keys(filters).includes('salePrice_gte')   ,
    isRemovable: true,
    onRemove:(filters)=>{
        const newFilters = {...filters}
        delete newFilters.salePrice_gte;
        delete newFilters.salePrice_lte;

        return newFilters;
    } ,
    onToggle: ()=>{},
},


]


function FilterViewer({filters={}, onChange=null}) {
    const classes=useStyles()
    const visibleFilter = useMemo(()=>{
        return FILTER_LIST.filter(x=> x.isVisible(filters))
    },[filters]); //prop visibleFilter chỉ tính lại khi và chỉ khi filter thay đổi
    return (
        <Box component="ul" className={classes.root}  >   
            {visibleFilter.map(x=>(
                <li key={x.id}>
                    <Chip 
                    label={x.getLable(filters)}
                    color={x.isActive(filters) ? 'primary':'default'}
                    clickable={!x.isRemovable }
                        onClick={
                            x.isRemovable
                            ? null
                            : ()=>{
                                    if(!onChange) return;

                                    const newFilters= x.onToggle(filters);
                                    onChange(newFilters);
                                    }
                                }
                    
                        onDelete={
                            x.isRemovable
                                ? () => {
                                    if(!onChange) return;

                                    const newFilters= x.onRemove(filters);
                                    onChange(newFilters);

                                }
                                : null
                        
                        
                                }
                    

                    />
                </li>
            ))}

        </Box>
    );
}

export default FilterViewer;