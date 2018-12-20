import * as React from 'react';
import './cart.css';
import { observer } from 'mobx-react';

import { cart, getTotalItems, getTotalPrice, removeItem, getItemTotalPrice } from 'src/lib/store';
import { action } from 'mobx';

@observer
export class CartDetail extends React.Component<{}, {}> {

    @action
    public removeItem = (event: React.MouseEvent<HTMLDivElement>) => {
        const id = Number(event.currentTarget.dataset.id);
        removeItem(id);
    }
    
    public render(){       
        const cartLength = cart.length;
        let cartItems;
        if(cartLength > 0){
            cartItems = cart.map(item=>{            
                return (
                    <div className="item flex equal summary body" key={'cartItem'+item.id+item.product_name}>
                        <div className="item name">{item.product_name}</div>
                        <div className="item qty">{item.qty}</div>
                        <div className="item price">{getItemTotalPrice(item.id)}</div>
                        <div className="item remove" data-id={item.id} onClick={this.removeItem}>X</div>
                    </div>
                );
            });
        }else{
            cartItems = <div className="item cart-empty">Your cart is empty!</div>;
        }
        return(
            <div className="item shrink cart-detail">
                <h2 className="item">Cart Summary</h2>
                <div className="item flex total">
                    <div className="item flex col">
                        <p className="item title">Items in cart</p>
                        <p className="item value">{getTotalItems()}</p>
                    </div>
                    <div className="item flex col">
                        <p className="item title">Total Rs.</p>
                        <p className="item value">{getTotalPrice()}</p>
                    </div>
                </div>
                <div className="item summary-list">
                    <div className="item flex equal summary head">
                        <div className="item">Item</div>
                        <div className="item">Quantity</div>
                        <div className="item">Total Rs.</div>
                    </div>
                    {cartItems}
                </div>
            </div>
        );
    }
}