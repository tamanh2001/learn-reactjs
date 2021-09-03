import userApi from "api/userApi";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import StorageKeys from "constants/storage-keys";



export const register = createAsyncThunk(
    'users/register',
    async(payload) => { //payload là tham số user truyền vào khi gọi register
        //có assync action, nhiệm vụ của nó là gọi API, với payload trên component
        //call API to register
        const data = await userApi.register(payload);
        //gọi API với tham số truyền vào ở trên component

        //save data( access_token và user) to local storage
        localStorage.setItem('access_token', data.jwt);
        localStorage.setItem('user', JSON.stringify(data.user));
        //action.payload chính là data.user
        return data.user;
    }
);
export const login = createAsyncThunk(
    'users/login',
    async(payload) => {
        const data = await userApi.login(payload);
        localStorage.setItem(StorageKeys.TOKEN, data.jwt);
        localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
        return data.user;
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
        settings: {},
    },
    // giá trị khởi tạo có thể dùng số chuỗi array ,..vv
    reducers: {
        logout(state) {
            //clear local storage
            localStorage.removeItem(StorageKeys.TOKEN);
            localStorage.removeItem(StorageKeys.USER);
            state.current = {};

            //reset state current về object rỗng
        }
    },
    extraReducers: {
        [register.fulfilled]: (state, action) => { //khi đăng kí thành công(fulfilled), nhận vào giá trị
            state.current = action.payload; //cập nhật vào current = payload được return ở trên
        },
        [login.fulfilled]: (state, action) => { //khi đăng kí thành công(fulfilled), nhận vào giá trị
            state.current = action.payload; //cập nhật vào current = payload được return ở trên
        },
    },

});


const { actions, reducer } = userSlice;
export const { logout } = actions;

export default reducer;