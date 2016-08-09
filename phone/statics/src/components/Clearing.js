import React from 'react'
import ReactDOM from 'react-dom'

import AddressList from './AddressList'

import Header from './Header'
import Footer from './Footer'

import ReactIScroll from 'react-iscroll'
var iScroll = require('iscroll');

const SecondItem = React.createClass({
	render() {
		return (
			<li className="common">
				<div className="img fl">
					<img src="images/goods.jpg" />
				</div>
				<div className="info fl">
					<p className="title">{this.props.data.title}</p>
					<p className="belong_sort">颜色分类:{this.props.data.goods_sort}</p>
					<p className="money_count">
						<span className="c-red">¥{this.props.data.price}</span>
						<span className="fr">x{this.props.data.count}</span>
					</p>
				</div>
			</li>
		)
	}
})

const FirstItem = React.createClass({
	render() {
		return (
			<div className="clearing_item">
				<p className="clearing_item_title">{this.props.data.seller_name}</p>
				<ul>
					{
						this.props.data.goods_list.map(data => {
							return <SecondItem data={data} key={data.id} />
						})
					}
				</ul>
				<div className="Logistics_type common_padding">
					<span>配送方式</span>
					<span className="fr">快递 免邮</span>
				</div>
				<div className="words common_padding">
					<span>给卖家留言:</span>
					<span className="fr">
						<input placeholder="选填:给卖家留言" />
					</span>
				</div>
				<div className="common_padding total">
					共{this.props.data.count}件,合计: <span className="c-red">¥{this.props.data.total}</span>
				</div>
			</div>
		)
	}
})

export default React.createClass({
	getInitialState: function () {

		var count = 0,
			total = 0;

		this.props.data.map(item => {
			count += item.count;
			total = Util.floatAdd(total,item.total);
		});

		return {
			count: count,
			total: total,
			list: [],
			default_address: {}
		};
	},
	componentDidMount: function() {
		this.getDefaultAddress();
		Util.setHeight();
	},
	//获得默认地址
	getDefaultAddress: function() {
		var _this = this;
		Util.ajax({
			url: Api['get_default_address'],
			success: function(data) {
				_this.setState({
					default_address: data.data
				});
			},
			error: function(data) {}
		});
	},
	getDefaultProps: function() {
		return ({
			options: {
				mouseWheel: true,
				click: true
			}
		})
	},
	//查看地址列表
	lookAddress: function(event) {
		var address_list = ReactDOM.findDOMNode(this.refs.address_list);

		ReactDOM.render(<AddressList chooseAddress={this.chooseAddress} pageUp={this.pageUp} />, address_list);
		$(address_list).addClass('slide');

		Util.stop(event);
	},
	chooseAddress: function(data) {
		this.setState({
			default_address: data
		});
		this.pageUp();
		Util.stop(event);
	},
	//返回
	pageUp: function(event) {
		var address_list = ReactDOM.findDOMNode(this.refs.address_list);
		$(address_list).removeClass('slide');

		setTimeout(function() {
			ReactDOM.unmountComponentAtNode(address_list);
		}, 300);

		event && Util.stop(event);
	},
	render: function(){

		var address = this.state.default_address.province_name +
			this.state.default_address.city_name +
			(this.state.default_address.area_name ? this.state.default_address.area_name : '') +
			this.state.default_address.address;

		return (
			<div>
			<div id="clearing" className="clearing">
				<Header type="clearing" {...this.props} />
				<ReactIScroll iScroll={iScroll} className="scroll_height" options={this.props.options}>
					<div className="common_padding_top">
						<div className="address" onClick={this.lookAddress}>
							<div className="address_name">
								<span>收货人:{this.state.default_address.receive_name}</span>
								<span className="fr">{this.state.default_address.receive_phone}</span>
							</div>
							<div className="address_content p-r">
								<span></span>
								<p>收货地址:{address}</p>
								<span></span>
							</div>
						</div>
						<div className="interval"></div>
						<div className="clearing_list">
							{
								this.props.data.map(data => {
									return <FirstItem data={data} key={data.seller_id} />
								})
							}
						</div>
					</div>
				</ReactIScroll>
				<Footer type="clearing" data={
					{ count: this.state.count,total: this.state.total }
				} />
			</div>
				<div ref="address_list" className="address_list_wrp"></div>
			</div>
		)
	}
})