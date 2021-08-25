import React, { useEffect } from 'react';
import {  Redirect, Route, Switch } from 'react-router-dom';
import TodoFeature from './features/Todo';
import AlbumFeature from './features/Album';
import productApi from './api/productApi';
import CounterFeature from './features/Counter';
import Header from 'components/Header';


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
        <Header />
        <Switch >
        <Redirect from = "/home" to = "/" exact />
        <Redirect from = "/post-list/:postId" to = "/posts/:postID" exact />

        <Route path = "/"
        component = { CounterFeature } exact  />
        <Route path = "/todo-list" component = { TodoFeature }/> 
        <Route path = "/album" component = { AlbumFeature }/> 
         </Switch >

         </div>
    );
}

export default App;