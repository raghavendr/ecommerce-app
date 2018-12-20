import {observable, action, autorun, toJS} from 'mobx';
import { getDataFromId } from './js.helper';

let existingData: Iproduct[] = [];
const sessionItem = localStorage.getItem('cart');

if(sessionItem){
    existingData = JSON.parse(sessionItem);
}

export let cart: Iproduct[] = observable(existingData as Iproduct[]);

autorun(()=> 
    localStorage.setItem('cart', JSON.stringify(toJS(cart)))
)


export function isItemInCart(id: number):boolean {
    return cart.some(item => item.id === id);

};

export function getTotalItems():number {
    return cart.length;
}

export function getTotalPrice():number {
   return cart.reduce((a,b) => a+b.price*b.qty, 0);
}

export function getItemTotalPrice(id: number) {
    const singleItem = cart.filter(item=> item.id === id)[0];
    return singleItem.price*singleItem.qty; 
 }

export const removeItem = action((id: number) => {
    cart.splice(cart.findIndex(v=> v.id === id), 1);
});

export const addItem = action((id: number) => {
    cart.push(getDataFromId(id));
});

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

