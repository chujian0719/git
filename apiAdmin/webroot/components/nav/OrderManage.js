import React from 'react'

const OrderManager = React.createClass({
    render(){
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
})

export default OrderManager;