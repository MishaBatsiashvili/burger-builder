import React, {Component} from 'react';

import Aux from '../../../hoc/Auxilary/Auxilary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    componentDidUpdate(){
        console.log('[OrderSummary.js] componentDidUpdate');
    }

    render (){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map((igKey, index) => {
            return (
            <li key={igKey+index}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
            </li>);
        });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType={'Danger'} clicked={this.props.purchaseCancelled}>Cancel</Button>
                <Button btnType={'Success'} clicked={this.props.purchaseContinued}>Continue</Button>
            </Aux>
        )
    }
    
}

export default OrderSummary;