import data from '../assets/data/products';

export function getData(){
    return data;
}

export function getDataFromId(id: number){

    const product = data.filter((item:any) => item.id === id)[0];
    return product;
}