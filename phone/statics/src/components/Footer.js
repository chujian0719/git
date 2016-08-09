import React from 'react'
import ReactDOM from 'react-dom'

import NavLink from './NavLink'
import Alert from './Alert'

export default React.createClass({
    getInitialState: function () {
        return {
            count: 0
        };
    },
    componentDidMount: function() {

        var _this = this;
        var storage = window.sessionStorage;
        var cart = storage && storage.getItem('cart');

        if(cart) {
            this.setState({
                count: _this.getCount(JSON.parse(cart))
            });

            return false;
        }

        Util.ajax({
            url: Api['get_cart_list'],
            success: function(data) {

                _this.setState({
                    count: _this.getCount(data.data)
                });

                storage.setItem('cart', JSON.stringify(data.data));
            },
            error: function(data) {}
        });
    },
    //获得购物车商品数量
    getCount: function(data) {
        var count = 0;

        data.map(item => {
            count += parseInt(item.count);
        });

        return count;
    },
    addStorage: function(data){
        var storage = window.sessionStorage;
        var cart = storage && storage.getItem('cart');

        if(storage) {
            cart = cart ? JSON.parse(cart) : [];
            if(cart.some(item => {return item.goods_id == data.goods_id;})){
                cart.map(item => {
                    item.goods_id == data.goods_id ? item.count = data.count : null;
                });
            } else {
                cart.push(data);
            }
            storage.setItem('cart', JSON.stringify(cart));
        }
    },
    //添加商品到购物车
    addHandle: function(event) {
        var _this = this,
            id = this.props.id,
            count = 1;

        var param = {
            goods_id: id,
            count: count
        };

        Util.ajax({
            url: Api['add_cart'],
            data: param,
            success: function(data) {

                var oAlert = document.getElementById('alert');
                ReactDOM.render(<Alert />, oAlert);
                setTimeout(function() {
                    ReactDOM.unmountComponentAtNode(oAlert);
                }, 2000);

                _this.setState({
                    count: _this.state.count + count
                });
                _this.addStorage(data.data);
            },
            error: function(data) {}
        });
    },
    //去结算
    payHandle: function(event) {
        if(this.props.state.count == 0) {
            return false;
        }

        var list = this.props.state.list,
            data = {};

        list.map(item => {
            if(item.checked) {
                data[item.id] = item.count;
            }
        });

        this.props.handle('clearing',{
            data: JSON.stringify(data)
        });
        Util.stop(event);
    },
    render: function() {
        var type = this.props.type;
        return (
            <footer className={'footer' + (type == 'address_operate' ? ' none' : '')}>
                {
                    type == 'detail' ?
                    <ul className="detail">
                        <li className="left_footer">
                            <a href="#/cart">
                                <span className="icon p-r icon-add_cart">
                                    {
                                        this.state.count == 0 ? null : <span className="count">{this.state.count}</span>
                                    }
                                </span>
                                <p>购物车</p>
                            </a>
                        </li>
                        <li className="right_footer" onClick={this.addHandle}>
                            加入购物车
                        </li>
                    </ul>
                    : null
                }
                {   type == 'cart' ?
                    <ul className="footer_cart">
                        <li className="left_footer">
                            <div className="choose active clearfix">
                                <span data-name="all_choose" onClick={this.props.handle}
                                      className={this.props.state.all_checked ? 'checkbox active fl' : 'checkbox fl'}></span>
                                <span className="fl">全选</span>
                                <span className="total fl">合计:</span>
                                <strong className="fl">¥ {this.props.state.total}</strong>
                            </div>
                        </li>
                        <li className="right_footer" onClick={this.payHandle}>
                            去结算{this.props.state.count == 0 ? null : '(' + this.props.state.count + ')'}
                        </li>
                    </ul>
                    : null
                }
                {   type == 'clearing' ?
                    <ul className="footer_cart footer_clearing">
                        <li className="left_footer">
                            <div className="choose active clearfix">
                                <strong className="fr mr-08">
                                    合计: <span className="c-red">¥{this.props.data.total}</span>
                                </strong>
                                <span className="fr mr-02">
                                    共<span className="c-red">{this.props.data.count}</span>件
                                </span>
                            </div>
                        </li>
                        <li className="right_footer">
                            提交订单
                        </li>
                    </ul>
                    : null
                }
                {   type == 'address_list' ?
                    <div className="address_list" onClick={this.props.handle}>
                        新增收货地址
                    </div>
                    : null
                }
                {   type == 'address_operate' ?
                    <div className="address_list" onClick={this.props.handle}>
                        保存收货地址
                    </div>
                    : null
                }
                {   type != 'address_operate' && type != 'detail' && type != 'clearing' && type != 'address_list' ?
                    <ul className="common">
                        <li>
                            <div className="center">
                                <NavLink to="index">
                                    <span className="icon icon-home"></span>
                                    <p>首页</p>
                                </NavLink>
                            </div>
                        </li>
                        <li>
                            <div className="center">
                                <NavLink to="sort">
                                    <span className="icon icon-sort"></span>
                                    <p>分类</p>
                                </NavLink>
                            </div>
                        </li>
                        <li>
                            <div className="center">
                                <NavLink to="tool">
                                    <span className="icon icon-tool"></span>
                                    <p>工具箱</p>
                                </NavLink>
                            </div>
                        </li>
                        <li>
                            <div className="center">
                                <NavLink to="cart">
                                    <span className="icon icon-cart p-r">
                                        <span className="count">{this.state.count}</span>
                                    </span>
                                    <p>购物车</p>
                                </NavLink>
                            </div>
                        </li>
                        <li>
                            <div className="center">
                                <NavLink to="my">
                                    <span className="icon icon-my"></span>
                                    <p>我的</p>
                                </NavLink>
                            </div>
                        </li>
                    </ul>
                    : null
                }
            </footer>
        )
    }
})