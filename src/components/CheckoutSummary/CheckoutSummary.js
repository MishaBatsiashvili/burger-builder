import React from 'react';

import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import classes from './CheckoutSummary.css'

const checkoutSummary = props => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it's tasty</h1>
            <div style={{height: '300px', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button
                clicked
                btnType="Danger">Cancel</Button>
            <Button
                clicked 
                btnType="Success">Continue</Button>
        </div>
    );
}

export default checkoutSummary;