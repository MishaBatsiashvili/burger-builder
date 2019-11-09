import React from 'react';

import classes from './SideDrawerTrigger.css';

const sideDrawerTrigger = props => (
    <div onClick={props.clicked} className={classes.SideDrawerTrigger}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default sideDrawerTrigger;