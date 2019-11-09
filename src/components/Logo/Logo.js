import React from 'react';

import burgerLogoImage from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = props => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={burgerLogoImage} alt="MyBurger"/>
    </div>
);

export default logo;