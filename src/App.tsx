import * as React from 'react';
import './app.css';
import { CartDetail } from './features/cart-details/cart';
import { ProductRoot } from './features/product-list/product';

class App extends React.Component {
    public render(){
        return (
            <div className="item main-container">
                <div className="item flex center">
                    <h1 className="item">ReactJS Application</h1>                    
                </div>
                <div className="item flex equal product-list-container">
                    <ProductRoot/>
                    <CartDetail/>
                </div>
            </div>
        );
    }
}

export default App;