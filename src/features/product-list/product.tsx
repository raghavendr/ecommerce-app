import * as React from 'react';
import { getData } from '../../lib/js.helper';
import { ProductList } from './product-list';


export class ProductRoot extends React.Component {
    public render(){
        const result = getData();
        return(
            <div className="item flex wrap product-list">
                {result.map((item:any, i:number) => {
                    return <ProductList id={item.id} key={i} />;
                })}
            </div>
        );
    }
}