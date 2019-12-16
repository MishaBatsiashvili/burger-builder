import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axiosOrder from '../../../axios-burger';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        },
        loading: false,
    }

    orderHandler = (event) => {

        event.preventDefault();
     
        this.setState( {loading: true} );
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'michael',
                address: {
                    stree: 'teststreet 2',
                    zip: '1234',
                    country: 'germany'
                }

            },
            deliveryMethod: 'XTRA Fast',
        }

        axiosOrder.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState( {loading: false} );
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                this.setState( {loading: false} );
            }); 
        
    }

    render(){
        let form = (<form>
            <input type="text" name="name" placeholder="Your Name"/>
            <input type="email" name="email" placeholder="Your Mail"/>
            <input type="text" name="street" placeholder="Street"/>
            <input type="text" name="postal" placeholder="Postal Code"/>
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);

        if(this.state.loading){
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter Contact Data</h4>
                {form}
            </div>
        );
    }

}

export default ContactData;