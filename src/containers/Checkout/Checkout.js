import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: {},
        totalPrice: null,
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let totalPrice;

        for(let param of query.entries()){
            // ['salad', 1]
            if (param[0] === 'price'){
                totalPrice = parseInt(param[1]);
            } else {
                ingredients[param[0]] = parseInt(param[1]);
                console.log(param[0], parseInt(param[1]) );
            }
        }
        this.setState({
            ingredients: ingredients,
            totalPrice: totalPrice,
        });
    }

    componentDidUpdate(){
        console.log('update');
    }

    checkoutCancelled = () => {
        this.props.history.goBack();
        console.log(this.props);
    }

    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return(
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}
                />
                
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => <ContactData {...props} ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} />}
                />

            </div>
        ) 
    }

}

export default Checkout;