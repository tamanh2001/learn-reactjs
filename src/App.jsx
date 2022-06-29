import Header from 'components/Header';
import CartFeature from 'features/Cart';
import ProductFeature from 'features/Product';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AlbumFeature from './features/Album';
import CounterFeature from './features/Counter';
import TodoFeature from './features/Todo';

function App() {
  //     const[bookList, setBookList]=useState([]);
  //     useEffect(()=>{
  //         const params={
  //             _limit:10,
  //         };
  //         const fetchBookList =async()=>{
  //             const bookData= await bookApi.getAll(params); //do lúc đầu mình getAll nó ra một cái object chứa cả books cả meta nên để console ra một cái mảng thì phải làm như dưới
  //             console.log(bookData['books']);
  //            setBookList(bookData['books']); //thay đổi initialState từ mảng rỗng sang mảng book

  //         }
  //         fetchBookList();
  //     },[]);

  //   useEffect(() => {
  //          const fetchProducts = async() => {
  //              const params = {
  //                  _limit: 10,
  //               };
  //              const productList = await productApi.getAll(params);
  //               console.log(productList);

  //          };
  //           fetchProducts();

  //       }, []);

  return (
    <div class="App">
      <Header />
      <Switch>
        <Redirect from="/home" to="/" exact />
        <Redirect from="/post-list/:postId" to="/posts/:postID" exact />

        <Route path="/" component={CounterFeature} exact />
        <Route path="/todo-list" component={TodoFeature} />
        <Route path="/album" component={AlbumFeature} />
        <Route path="/products" component={ProductFeature} />
        <Route path="/carts" component={CartFeature} />
      </Switch>
      {/* <BookList books={bookList}/>  */}
    </div>
  );
}

export default App;
