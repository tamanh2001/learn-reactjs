import React, { useEffect } from 'react';

import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import TodoFeature from './features/Todo';
import AlbumFeature from './features/Album';
import productApi from './api/productApi';


function App() {
    useEffect(() => {
        const fetchProducts = async() => {
            const params = {
                _limit: 10,
            };
            const productList = await productApi.getAll(params);
            console.log(productList);
        };
        fetchProducts();

    }, []);
    return ( < div class = "App" >
        Header

        <p> < NavLink to = "/todos" > Todo </NavLink> </p >
        <p> < NavLink to = "/album" > Album </NavLink> </p >
        <Switch >
        <Redirect from = "/home" to = "/" exact />
        <Redirect from = "/post-list/:postId" to = "/posts/:postID" exact />

        <Route path = "/" component = { TodoFeature }exact />
        <Route path = "/todo-list" component = { TodoFeature }/>
        <Route path = "/album" component = { AlbumFeature }/> 
        </Switch >
        Footer 
        </div>
    );
}

export default App;