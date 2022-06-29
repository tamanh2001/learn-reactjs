const { createSlice } = require('@reduxjs/toolkit');

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        showMiniCart: false,
        cartItems: [],
    },
    reducers: {
        //là một cái object,mỗi cái key là một trường hợp,và nó là một cái hàm, ví dụ như hàm tăng giảm
        //  nếu cần dùng action paylot thì giữ lại, ở đây ko cần nên xóa
        showMiniCart(state) {
            return (state.showMiniCart = true);
        },
        hideMiniCart(state) {
            return (state.showMiniCart = false);
        },
        addToCart(state, action) {
            //newItem={ id,product,quantity}
            const newItem = action.payload;
            const index = state.cartItems.findIndex((x) => x.id === newItem.id);
            if (index >= 0) {
                //nếu sp add vào giỏ hàng đã có trong giỏ thì thêm số lượng
                state.cartItems[index].quantity += newItem.quantity;
            } else {
                //add sp vào giỏ hàng
                state.cartItems.push(newItem);
            }
        },
        setQuantity(state, action) {
            const { id, quantity } = action.payload;
            //check xem sản phẩm có trong giỏ không
            const index = state.cartItems.findIndex((x) => x.id === id);
            if (index >= 0) {
                state.cartItems[index].quantity = quantity;
            }
        },
        removeFromCart(state, action) {
            const idNeedToRemove = action.payload;
            state.cartItems = state.cartItems.filter((x) => x.id !== idNeedToRemove);
        },
    },
});
// dùng object destructuring được tạo ra từ việc gọi hàm createSlice để lấy thông tin của actions và reducer

const { actions, reducer } = cartSlice;
export const { showMiniCart, hideMiniCart, addToCart, setQuantity, removeFromCart } = actions; //named export
export default reducer; //default export