import React from 'react'

const NoticePush = React.createClass({

    render(){
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
})
export default NoticePush;