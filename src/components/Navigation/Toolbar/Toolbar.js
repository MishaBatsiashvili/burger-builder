import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawerTrigger from '../SideDrawer/SideDrawerTrigger/SideDrawerTrigger';

const toolbar = props => (
    <header className={classes.Toolbar}>
        <SideDrawerTrigger clicked={props.sideDrawerToggleClicked}/>
        <div className={classes.Logo}>
            <Logo height="80"/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;