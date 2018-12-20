import * as React from 'react';
import { getDataFromId } from '../../lib/js.helper';
import './product-list.css';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import { cart, isItemInCart, removeItem, getItemFromCart, getQuantity } from 'src/lib/store';

@observer
export class ProductList extends React.Component<{id: number}, {}> {

    @action
    public AddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(isItemInCart(this.props.id)){
            cart.forEach(item=> {
                if(item.id === this.props.id){
                    item.qty++;
                }
            });
        }else{         
            cart.push(getDataFromId(this.props.id));
        }
    }

    @action
    public reduceQty = (id: number) => {
        const item = getItemFromCart(id);
        if(item.qty === 1){
            // remove item from cart
            removeItem(item.id);
        }else{
            item.qty--;
        }
    }

    @action
    public increaseQty = (id: number) => {
        const item = getItemFromCart(id);
        item.qty++;
    }
    
    public render(){
        
        const item =  getDataFromId(this.props.id);
        
        return(
            <div className="item product-items">
                <p className="item price">{item.price}</p>
                <h2 className="item">{item.product_name} <span className="item shrink">{item.brand_name}</span></h2>
                <div className="item flex center image-desc">
                    <img className="item" src={item.image} />
                    <p className="item">{item.detail}</p>
                </div>
                <div className="item flex center actions">
                {isItemInCart(item.id)? 
                    <div className="item shrink flex center cartCount">
                        <button className="item shrink" onClick={this.reduceQty.bind(this, item.id)}>-</button>
                        <div className="item">{getQuantity(item.id)} in cart</div>
                        <button className="item shrink" onClick={this.increaseQty.bind(this, item.id)}>+</button>
                    </div> 
                    : 
                    <button type="submit" onClick={this.AddToCart}>Add to cart</button>                 
                } 
                </div>            
            </div>
        );
    }
}