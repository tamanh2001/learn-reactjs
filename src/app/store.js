//redux store
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/Counter/counterSlice'; //default import

const rootReducer = {
    // bao gồm tất cả reducer mà mình có
    count: counterReducer, // ở bên counterSlice mình đã export reducer
    //tên tương ứng state mình đã truy cập, đây là biến đếm đặt =counter,
};
const store = configureStore({

    reducer: rootReducer,


});
export default store;