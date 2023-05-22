import axios from "axios";
import { Product } from "../../common/types/product/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseDto } from "../../common/types/response";
import { store } from "../store";
import { addProduct, removeProduct, getProducts, updateProduct } from "../reducers/productSlice";

const ProductApiUrl : string = 'https://localhost:7102/api/products';

export const getProductsFromDb = createAsyncThunk(
    'products/getProducts',
    async (_, {rejectWithValue}) => {
        await axios.get(ProductApiUrl)
        .then((resp) => {
            const response : ResponseDto<Array<Product>> = resp.data;
            console.log(response);
            
            if (!response.isSuccess) {
                throw new Error('Server error');
            }
            
            store.dispatch(getProducts(response.result));
        })
        .catch(err => rejectWithValue(err.message));
    } 
);

export const addProductToDb = createAsyncThunk(
    'products/addProduct',
    async (product: Product, {rejectWithValue}) => {
        await axios.post(ProductApiUrl, product, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => {
            const response : ResponseDto<Product> = resp.data;

            if (response.isSuccess) {
                store.dispatch(addProduct(response.result));
            }
        })
        .catch(err => rejectWithValue(err.message));
    }
);

export const deleteProductFromDb = createAsyncThunk(
    'products/deleteProduct',
    async (id: number, {rejectWithValue}) => {
        await axios.delete(`${ProductApiUrl}?id=${id}`)
        .then((resp) => {
            const response : ResponseDto<Boolean> = resp.data;
            
            if (response.result) {
                store.dispatch(removeProduct(id));
            }
        })
        .catch(err => rejectWithValue(err.message));
    }
);

export const updateProductFromDb = createAsyncThunk(
    'products/updateProduct',
    async (product: Product, {rejectWithValue}) => {
        await axios.put(ProductApiUrl, product, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => {
            const resposne : ResponseDto<Product> = resp.data;
            
            if (resposne.isSuccess) {
                store.dispatch(updateProduct(resposne.result));
            }
        })
        .catch(err => rejectWithValue(err.message));
    }
);
