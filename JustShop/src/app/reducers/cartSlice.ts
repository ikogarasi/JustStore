import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../common/types/cart/cartType";
import { CartDetails } from "../../common/types/cart/cartDetails";

interface CartState {
    cart: Cart
}

const initialState : CartState = {
    cart: {
        cartDetails: [],
        cartHeader: {userId: "", couponCode: ""}
    }
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        getCart(state, action) {
            state.cart = action.payload;
        },
        addToCart(state, action) {
            const cartDetailsFromState = state.cart.cartDetails
                .find(it => it.productId === action.payload.cartDetails[0].productId) as CartDetails;
            
            if (cartDetailsFromState) {
                const index = state.cart.cartDetails.indexOf(cartDetailsFromState);
                state.cart.cartDetails[index].count += +action.payload.cartDetails[0].count;        
            }
            else {
                state.cart.cartDetails.push(
                    action.payload.cartDetails[0]
                );
            }
        },
        deleteFromCart(state, action) {
            state.cart.cartDetails = state.cart.cartDetails.filter(it => it.cartDetailsId !== action.payload);
        }
    }
});

export const {getCart, addToCart, deleteFromCart} = cartSlice.actions;
export default cartSlice.reducer;