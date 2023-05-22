import { CartHeader } from "./cartHeader";
import { CartDetails } from "./cartDetails"

export interface Cart {
    cartHeader : CartHeader;
    cartDetails : Array<CartDetails>
}