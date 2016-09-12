import React from 'react'

import Nav from './Nav'
//import TopNavBar from './TopNavBar'

import Header from './Header'
import Footer from './Footer'

const Main = React.createClass({
    componentDidMount(){},
    render(){
        return (
            <div id="wrapper">
                <Header {...this.props}/>
                <div className="nav">
                    <Nav {...this.props}/>
                </div>
                <div id="page-wrapper" className="gray-bg">
                    <div>
                        {this.props.children}
                    </div>
                    <div className="footer">
                        <Footer/>
                    </div>
                </div>
                <div id="box"></div>
            </div>
        )
    }
})
export default Main;