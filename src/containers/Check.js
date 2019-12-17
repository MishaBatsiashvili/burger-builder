import React, {Component} from 'react';

class Check extends Component {
    componentDidMount(){
        console.log('[Check.js] componentDidMount');
    }

    componentWillUnmount(){
        console.log('[Check.js] componentWillUnmount');
    }

    componentDidUpdate(){
        console.log('[Check.js] componentDidUpdate');
    }

    render(){
        return <div>CHECK</div>;
    }
}

export default Check;