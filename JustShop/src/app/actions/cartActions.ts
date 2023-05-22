import { createAsyncThunk } from "@reduxjs/toolkit";
import { Cart } from "../../common/types/cart/cartType";
import axios from "axios";
import { ResponseDto } from "../../common/types/response";
import { store } from "../store";
import { addToCart, deleteFromCart, getCart } from "../reducers/cartSlice";

const cartApiUrl : string = 'https://localhost:7174/api/carts';

export const getCartFromDb = createAsyncThunk(
    'cart/getCart',
    async (id: string, {rejectWithValue}) => {
        axios.get(`${cartApiUrl}/GetCart/${id}`)
        .then((resp) => {
            const response : ResponseDto<Cart> = resp.data;
            console.log(response);
            
            if (response.isSuccess) {
                store.dispatch(getCart(response.result));
            }
        })
        .catch((err) => rejectWithValue(err.message));
    }
)

export const addCartToDb = createAsyncThunk(
    'cart/addToCart',
    async(cart: Cart, {rejectWithValue}) => {
        axios.post(`${cartApiUrl}/AddCart`, cart, {
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then((resp) => {
            const response : ResponseDto<Cart> = resp.data;
            console.log(response);
            
            if(response.isSuccess) {
                store.dispatch(addToCart(response.result));
            }
        })
        .catch((err) => rejectWithValue(err.message));
    }
);

export const deleteFromCartAtDb = createAsyncThunk(
    'cart/deleteFromCart',
    async(id: number, {rejectWithValue}) => {
        await axios.delete(`${cartApiUrl}/RemoveCart?cartId=${id}`)
        .then((resp) => {
            const response : ResponseDto<Cart> = resp.data;
            
            if (response.isSuccess) {
                store.dispatch(deleteFromCart(id));
            }
        })
        .catch((err) => rejectWithValue(err.message));
    }
)
