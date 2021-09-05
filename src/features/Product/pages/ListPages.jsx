import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import productApi from 'api/productApi';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import FilterViewer from '../components/Filters/FilterViewer';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';
import queryString from 'query-string';


const useStyles=makeStyles(theme =>({
    root:{},
    left:{width:'250px'},
    right:{
        flex:'1 1 0'  //chiếm hết độ rộng của th cha
    },
    pagination:{
        display:"flex",
        flexWrap:"row nowrap",
        justifyContent:"center",
        marginTop:"20px",
        paddingBottom:"20px",
        
    }
}))



function ListPages(props) {
    const classes=useStyles();
    const history =useHistory();
    const location = useLocation();
    const queryParams= useMemo(()=>{
        const params= queryString.parse(location.search); //dạng chuỗi nên mọi dl đều biểu diễn dạng chuỗi nên ko return luôn được
        return{
            ...params,
            _page: Number.parseInt(params._page) || 1,
            _limit: Number.parseInt(params._limit)|| 9,
            _sort: params._sort||"salePrice :ASC",
            isPromotion: params.isPromotion==='true',
            isFreeShip: params.isFreeShip==='true',
            //ta đã có object queryParams chứa mọi trạng thái của mình nên không cần filters nữa

        };

    },[location.search]);
    const[productList,setProductList]=useState([]); //loading xong thì render productList
    const[pagination,setPagination]=useState({
        total:10,
        limit:9,
        page:1,
    });
    const[loading,setLoading]=useState(true); //đang loading thì render skeleton
    // const[filters,setFilters]=useState(()=>({
    //     ...queryParams, //chuyển phần search từ JSON sang object,lấy tất cả gt của nó trừ 3 thằng dưới phải kiểm tra xem có hay không
    //     _page: Number.parseInt(queryParams._page) || 1,
    //     _limit: Number.parseInt(queryParams._limit)|| 9,
    //     _sort: queryParams._sort||"salePrice :ASC",
    // })); //để lấy phần search trên location cập nhật vào filters để khi reload vẫn giữ được trang hiện tại
    // useEffect(()=>{
    //     history.push({
    //         pathname : history.location.pathname, //lấy tên đường dẫn trang web (phần trước dấu ?)
    //          search : queryString.stringify(filters), //chuyển object sang JSON  phần search sau dấu ?
    //     });

    // },[history,filters])
    useEffect(()=>{
        (async()=>{
            try {
                const {data,pagination} = await productApi.getAll(queryParams);
                setProductList(data);
                console.log({data,pagination});
                setPagination(pagination); //là pagination ở const trong try
                
            } catch (error) {
                console.log('Failed to fetch product list',error);
            }
             setLoading(false); //sau khi loading thì set về false để hiển thị sản phẩm
        })();
    },[queryParams]); //mỗi khi filter thay đổi mình sẽ đi get lại list sản phẩm
    
    const handlePageChange=(e,page)=>{
        //khi page thay đổi thì update lại state filters => effect được chạy lại với filter mới
        // setFilters(prevFilters => ({
        //     ...prevFilters, //giữ lại filter trước đó chỉ thay đổi page
        //     _page: page,
        // }));
        const filters={
            ...queryParams,
            _page:page,
        }
        history.push({
                    pathname : history.location.pathname, //lấy tên đường dẫn trang web (phần trước dấu ?)
                     search : queryString.stringify(filters), //chuyển object sang JSON  phần search sau dấu ?
                });


    };
    const handleSortChange=(newSortValue)=>{
        // setFilters(prevFilters=>({
        //     ...prevFilters,
        //     _sort:newSortValue,
        // }))
        const filters={
            ...queryParams,
            _sort:newSortValue,
        }
        history.push({
                    pathname : history.location.pathname, //lấy tên đường dẫn trang web (phần trước dấu ?)
                     search : queryString.stringify(filters), //chuyển object sang JSON  phần search sau dấu ?
                });
      
    }
    const handleFiltersChange=(newFilters)=>{
        // setFilters(prevFilters=>({
        //     ...prevFilters,
        //     ...newFilters, //object chứa nhiều filters mới
        // }))
        const filters={
            ...queryParams,
           ...newFilters,
        }
        history.push({
                    pathname : history.location.pathname, //lấy tên đường dẫn trang web (phần trước dấu ?)
                     search : queryString.stringify(filters), //chuyển object sang JSON  phần search sau dấu ?
                });
      
    }
    const setNewFilters=(newFilters)=>{
        // setFilters(newFilters);
        history.push({
            pathname : history.location.pathname, //lấy tên đường dẫn trang web (phần trước dấu ?)
             search : queryString.stringify(newFilters), //chuyển object sang JSON  phần search sau dấu ?
        });

    }
    return ( 
        <Box>
            <Container >
                <Grid container spacing={1}>
                    <Grid item className={classes.left}> 
                    <Paper elevation={0} >
                        <ProductFilters filters={queryParams} onChange={handleFiltersChange}/>
                        
                    </Paper>
                    </Grid>
                    <Grid item className={classes.right}> 
                    <Paper elevation={0}>
                        <ProductSort currentSort={queryParams._sort} onChange={handleSortChange}/>
                        <FilterViewer filters={queryParams} onChange={setNewFilters}/>
                        {loading ? <ProductSkeletonList length={9}/> : <ProductList data={productList}/>}
                        
                    <Box className={classes.pagination}>

                    <Pagination color="primary" count={Math.ceil(pagination.total/pagination.limit)} page={pagination.page} onChange={handlePageChange}></Pagination>
                    </Box>
                    </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListPages;