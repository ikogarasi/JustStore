import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../common/types/product/product";

interface ProductState {
    products: Product[],
    product: Product | {}
}

const initialState : ProductState = {
    products: [],
    product: {}
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getProducts(state, action) {
            state.products = action.payload;
        },
        addProduct(state, action) {
            state.products.push(action.payload);
        },
        getProductById(state, action) {
            state.product = state.products.find(it => it.id === action.payload) as Product;
        },
        removeProduct(state, action) {
            state.products = state.products.filter(it => it.id !== action.payload) as Product[];
        },
        updateProduct(state, action) {
            const oldProduct = state.products.find(it => it.id === action.payload.id) as Product
            state.products[state.products.indexOf(oldProduct)] = action.payload;
        }
    },
    
})

export const {getProducts, addProduct, getProductById, removeProduct, updateProduct} = productSlice.actions;
export default productSlice.reducer;