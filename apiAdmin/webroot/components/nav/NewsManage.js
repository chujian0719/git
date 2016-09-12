import React from 'react'

const NewsManager = React.createClass({

    render(){
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
})

export default NewsManager;