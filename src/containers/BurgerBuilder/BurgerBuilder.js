import React, {Component} from 'react';
import axiosOrder from '../../axios-burger';

import Aux from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount(){
        console.log('BurgerBuilder.js did mount');
        axiosOrder.get('https://react-burger-7ce15.firebaseio.com/ingredients.json')
            .then((response) => {
                console.log('BurgerBuilder.js axios get request response');
                this.setState({
                    ingredients: response.data
                });
            })
            .catch(err => {
                this.setState({error: true});
            });
    }

    componentDidUpdate(){
        console.log('BurgerBuilder.js did update');
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el)=> {
                return sum + el; 
            }, 0);
        
        this.setState({
            purchasable: sum > 0
        });
    }

    addIngredientHandler = type => {
        // updating ingredient amount
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        // updating total burger price
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        // setting new state
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients,
        });

        // update purchasable prop in state
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = type => {
        // updating ingredient amount
        const oldCount = this.state.ingredients[type];
        if(oldCount > 0){
            const updatedCount = oldCount-1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;

            // updating total burger price
            const priceAddition = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceAddition;

            // setting new state
            this.setState({
                totalPrice: newPrice,
                ingredients: updatedIngredients,
            });

            // update purchasable prop in state
            this.updatePurchaseState(updatedIngredients);
        }
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');


        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString,
        });
    }

    render(){

        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] === 0;
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> :<Spinner />;

        if(this.state.ingredients){
            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                totalPrice={this.state.totalPrice}/>;

            burger = <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        disabled={disabledInfo}
                        ingridientAdded={this.addIngredientHandler}
                        ingridientRemoved={this.removeIngredientHandler}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}/>
                </Aux>;
        }

        if(this.state.loading){
            orderSummary = <Spinner />;
        }


        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axiosOrder);