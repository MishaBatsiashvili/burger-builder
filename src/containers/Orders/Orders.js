import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axiosOrder from '../../axios-burger';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount(){
        axiosOrder.get('/orders.json')
            .then(res => {
                console.log(res);
                const fetchedOrders = [];
                for(let key in res.data){
                    fetchedOrders.push({
                        id: key,
                        ...res.data[key]
                    });
                }

                this.setState({
                    loading: false,
                    orders: fetchedOrders,
                });
            })
            .catch(err => {
                this.setState({
                    loading: false,
                });
            });
    }

    render(){
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axiosOrder);