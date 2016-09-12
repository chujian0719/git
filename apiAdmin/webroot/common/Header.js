import React from 'react'
import {Link} from 'react-router'

const Header = React.createClass({

    render(){

        var {pathname} = this.props.location;

        return (
            <header id="header" className="animated fadeInDown">
                <div className="navbar-header">
                    <a href="javascript:;" className="navbar-brand">
                        {$("body").hasClass("mini-navbar") ? '人人购' : '人人购管理'}
                    </a>
                </div>
                <div>
                    <ul className="nav navbar-nav">
                        <li className={pathname.startsWith("/notice_push") ? "active" : ""}>
                            <Link to="/notice_push/push_message">
                                <i className="fa fa-th-large"></i>
                                <span className="nav-label">公告推送</span>
                            </Link>
                        </li>
                        <li className={pathname.startsWith("/advert_put") ? "active" : ""}>
                            <Link to="/advert_put">
                                <i className="fa fa-th-large"></i>
                                <span className="nav-label">广告投放</span>
                            </Link>
                        </li>
                        <li className={pathname.startsWith("/order_manage") ? "active" : ""}>
                            <Link to="/order_manage/list">
                                <i className="fa fa-th-large"></i>
                                <span className="nav-label">订单管理</span>
                            </Link>
                        </li>
                        <li className={pathname.startsWith("/news_manage") ? "active" : ""}>
                            <Link to="/news_manage/list">
                                <i className="fa fa-sitemap"></i>
                                <span className="nav-label">新闻管理</span>
                            </Link>
                        </li>
                        <li className={pathname.startsWith("/member_manage") ? "active" : ""}>
                            <Link to="/notice_push">
                                <i className="fa fa-cubes"></i>
                                <span className="nav-label">会员管理</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </header>
        )
    }
})
export default Header;