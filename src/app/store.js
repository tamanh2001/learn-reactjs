//redux store
import userReducer from '../features/Auth/userSlice';
import counterReducer from '../features/Counter/counterSlice'; //default import
import cartReducer from '../features/Cart/CartSlice';
const { configureStore } = require('@reduxjs/toolkit');

const rootReducer = {
    // bao gồm tất cả reducer mà mình có
    count: counterReducer, // ở bên counterSlice mình đã export reducer
    //tên tương ứng state mình đã truy cập, đây là biến đếm đặt =counter,
    user: userReducer,
    cart: cartReducer,
};
const store = configureStore({
    reducer: rootReducer,
});
export default store;