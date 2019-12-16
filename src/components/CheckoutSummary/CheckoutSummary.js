import React from 'react';

import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import classes from './CheckoutSummary.css'

const checkoutSummary = props => {
    console.log(props.ingredients);
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it's tasty</h1>
            <div style={{margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button
                clicked={props.checkoutCancelled}
                btnType="Danger">Cancel</Button>
            <Button
                clicked={props.checkoutContinued}
                btnType="Success">Continue</Button>
        </div>
    );
}

export default checkoutSummary;