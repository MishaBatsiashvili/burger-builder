import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axiosOrder from '../../../axios-burger';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
            },

            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
            },

            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
                valid: false,
            },

            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
            },

            email: {
                elementType: 'email',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mails'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
            },

            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest'},
                        { value: 'cheapest', displayValue: 'Cheapest'},
                    ],
                },
                value: '',
            },
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState( {loading: true} );

        const formData = {};
        for(let formElementId in this.state.orderForm){
            formData[formElementId] = this.state.orderForm[formElementId].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData,
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

    checkValidity = (value, rules) => {
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputId) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputId]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        console.log(updatedFormElement);
        updatedOrderForm[inputId] = updatedFormElement;

        this.setState({
            orderForm: updatedOrderForm,
        });
    }

    render(){

        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (<form onSubmit={this.orderHandler}>
            {formElementsArray.map( formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                )
            )}
            <Button btnType="Success">ORDER</Button>
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