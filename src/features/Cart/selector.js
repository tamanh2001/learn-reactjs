import { createSelector } from '@reduxjs/toolkit';
import { count } from 'yargs';

const cartItemSelector = (state) => state.cart.cartItems;
//Count number of products in cart
export const cartItemsCountSelector = createSelector(cartItemSelector, (cartItems) =>
    cartItems.reduce((count, item) => count + item.quantity, 0)
);
//calulate total of cart
export const cartTotalSelector = createSelector(cartItemSelector, (cartItems) =>
    cartItems.reduce((total, item) => total + item.quantity, 0)
);