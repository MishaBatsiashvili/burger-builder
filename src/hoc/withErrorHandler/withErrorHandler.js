import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilary/Auxilary';

const withErrorHandler = (WrapperdComponent, axios) => {
    return class extends Component {

        state = {
            error: null,
        }

        constructor(props){
            super(props);

            this.reqInterceptor = axios.interceptors.request.use(reqConfig => {
                console.log(reqConfig);
                this.setState({error: null});
                return reqConfig;
            });

            this.resInterceptor = axios.interceptors.response.use(resp => {
                console.log(resp);
                return resp;
            }, error => {
                console.log();
                this.setState({error: error});
            });
        }

        componentWillUnmount(){
            console.log('will unmout', this.reqInterceptor, this.reqInterceptor2, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render(){
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrapperdComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;