import { Product } from "../product/product"
import { CartHeader } from "./cartHeader"

export interface CartDetails {
    cartDetailsId? : number;
    cartHeaderId? : number;
    cartHeader?: CartHeader;
    productId: number;
    product?: Product;
    count: number;
}