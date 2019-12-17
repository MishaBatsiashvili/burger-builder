import React from 'react';

import classes from './Order.css';

const order = props => {

    const ingredientsJSXArr = [];
    for(let key in props.ingredients){
        const emptyObj = {};
        emptyObj[key] = props.ingredients[key];
        console.log(emptyObj);

        ingredientsJSXArr.push(
            <span key={key} className={classes.Ingredient}>{key} ({emptyObj[key]})</span>
        );
    }

    return (
    <div className={classes.Order}>
    <p>Ingredients: {ingredientsJSXArr}</p>
        <p style={{marginTop: '10px'}}>Price <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
    );
};

export default order;