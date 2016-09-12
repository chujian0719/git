import React from 'react'
import {Link} from 'react-router'

import Nav from '../conf/Nav'


const Navigation = React.createClass({
    componentDidMount(){
        console.log("did mount");
    },
    toggle(event){
        var curTart = event.currentTarget;
        $(curTart).next().collapse("toggle");
        $(curTart).parent().toggleClass("active");
    },
    render(){
        //get 当前路由
        var {pathname} = this.props.location;

        var reg = /\/([a-zA-Z0-9_]+)\/?/;
        var pathArr = reg.exec(pathname);
        var firstPath = pathArr && pathArr[1];

        var navs = Nav[firstPath];

        return (
            <nav id="left_nav" className="navbar-default navbar-static-side" role="navigation">
                <div className="sidebar-collapse">
                    <ul className="nav" id="side-menu">
                        <li className="nav-header">
                            <span className="block m-t-xs">
                                <strong className="font-bold">{navs.title}</strong>
                            </span>
                        </li>
                        {
                            navs.subs.map((nav,i) => {
                                var {subs,url,level,icon} = nav,
                                    subChildren = "",
                                    arrow = "",
                                    link = <Link onClick={this.toggle} to={url}>
                                            <i className={icon}></i>
                                            <span className="nav-label">{nav.title}</span>
                                        </Link>;

                                if(subs && subs.length > 0){
                                    subChildren = <Navigation_item key={nav.id + "_" + i} {...this.props} subs={subs} url={url} level={level} collspan={this.toggle}/>;
                                    arrow = <span className="fa arrow"></span>;
                                    link = <a onClick={this.toggle} href="javascript:;">
                                            <i className={icon}></i>
                                            <span className="nav-label">{nav.title}</span>
                                            {arrow}
                                        </a>;
                                }

                                return (
                                    <li key={"li" + nav.id + "_" + i } className={pathname.startsWith(url) ? "active" : ""}>
                                        {link}
                                        {subChildren}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </nav>
        )
    }
})

const Navigation_item = React.createClass({
    render(){
        var {props} = this,
            {pathname} = props.location,
            {collspan,subs,url,level} = props,
            subsChildren = "";

        if(subs == undefined) subs = [];
        if(subs && subs.length>0){

            subsChildren = subs.map((item,i) => {
                var nav_ul = "",
                    arrow = "",
                    link = <Link to={ item.url }>{item.title}{arrow}</Link>;

                if(item.subs && item.subs.length > 0){
                    nav_ul = <Navigation_item {...props} subs={item.subs} url={item.url} level={item.level}/>;
                    arrow = <span className="fa arrow"></span>;
                    link = <a onClick={collspan} href="javascript:;">
                        {item.title}{arrow}
                    </a>;
                }
                return (
                    <li key={"_"+ i} className={pathname.startsWith(item.url) ? "active" : ""}>
                        {link}
                        {nav_ul}
                    </li>
                )
            })
        }

        return (
            <ul className={"nav collapse " + level + (pathname.startsWith(url) ? " in" : "")}>
                {subsChildren}
            </ul>
        )
    }
})

export default Navigation;