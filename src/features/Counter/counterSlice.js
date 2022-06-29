const { createSlice } = require('@reduxjs/toolkit');

const counterSlice = createSlice({
    name: 'counter',
    initialState: 0,
    // giá trị khởi tạo có thể dùng số chuỗi array ,..vv
    reducers: {
        //là một cái object,mỗi cái key là một trường hợp,và nó là một cái hàm, ví dụ như hàm tăng giảm
        //  nếu cần dùng action paylot thì giữ lại, ở đây ko cần nên xóa
        increase(state) {
            return state + 1;
        },
        decrease(state) {
            return state - 1;
        },
    },
});
// dùng object destructuring được tạo ra từ việc gọi hàm createSlice để lấy thông tin của actions và reducer

const { actions, reducer } = counterSlice;
export const { increase, decrease } = actions; //named export
export default reducer; //default export