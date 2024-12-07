import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCartOpen: false,
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    removeFromCart: (state, action) => {
      console.log(action.payload);
      
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find((cartItem) => cartItem.id === action.payload);
      if (item) {
        item.quantity += 1; // Increase quantity
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((cartItem) => cartItem.id === action.payload);
      if (item) {
        if(item.quantity > 1) {
          item.quantity -= 1; // Decrease quantity
        }
      }
    },
  },
});

export const { toggleCart, addToCart, removeFromCart, clearCart , increaseQuantity , decreaseQuantity} = cartSlice.actions;
export default cartSlice.reducer;
