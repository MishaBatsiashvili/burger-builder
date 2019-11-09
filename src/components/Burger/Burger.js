import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {

    // save ingedients object keys inside array
    let transformedIngredients = Object.keys(props.ingredients);

    // transform ingredients into JSX elements respecting the amount
    transformedIngredients = transformedIngredients.map(igKey => {
        return [...Array(props.ingredients[igKey])]
        .map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
        });
    });

    // flattening out the array of JSX elements
    transformedIngredients = transformedIngredients.reduce((prevVal, curVal) => {
        return prevVal.concat(curVal);
    }, []);



    
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients</p>;
    }

    console.log(transformedIngredients);

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;