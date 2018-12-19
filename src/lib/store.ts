import {observable, action} from 'mobx';

export let cart: Iproduct[] = observable([] as Iproduct[]);

export function isItemInCart(id: number):boolean {
    return cart.some(item => item.id === id);

};

export function getTotalItems():number {
    return cart.length;
}

export function getTotalPrice():number {
   const totalPrice  = cart.reduce((a,b) => a+b.price, 0);

   return totalPrice;
}

export const removeItem = action((id: number) => {
    cart.splice(cart.findIndex(v=> v.id === id), 1);
})

export function getItemFromCart(id: number){
    return cart.filter((item:any) => item.id === id)[0];
}

export function getQuantity(id:number){
    return getItemFromCart(id).qty;
}

export interface Iproduct {
    id: number;
    image: string
    brand_name: string;
    product_name: string;
    price: number;
    qty: number;
    detail: string
}

