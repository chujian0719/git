import React from 'react'
import ReactDOM from 'react-dom'

import Detail from './Detail'
import Clearing from './Clearing'

import Header from './Header'
import Footer from './Footer'

import Loading from './Loading'

import ReactIScroll from 'react-iscroll'
var iScroll = require('iscroll');

export default React.createClass({
	page:{},
	getInitialState: function () {
		return {
			list: [],
			cart_count: 0,
			total: 0,
			count: 0,
			all_checked: false
		};
	},
	componentDidMount: function() {
		this.getList();
		Util.setHeight('clearing');
	},
	//获得购物车列表
	getList: function() {
		var _this = this;

		Util.ajax({
			url: Api['get_cart_list'],
			success: function(data) {
				data.data.map((item) => item.checked = false);
				_this.setState({
					list: data.data
				});
				_this.editStorage(data.data);
			},
			error: function(data) {}
		});
	},
	editStorage: function(list){
		var storage = window.sessionStorage;
		if(storage) {
			storage.setItem('cart', JSON.stringify(list));
		}
	},
	changeFooter: function(list) {
		let total = 0;
		let count = 0;
		let checked_num = 0;

		list.map((item) => {
			if (item.checked) {
				checked_num += 1;
				total += item.count * item.price;
				count += item.count;
			}
		});

		this.setState({
			all_checked: checked_num == list.length,
			total: total,
			count: count
		});
	},
	//编辑购物车
	editCart: function(data, callback) {
		var _this = this;
		var count = data.type == 'up' ? 1 : -1;

		Util.ajax({
			url: Api['edit_cart'],
			data: data,
			success: function(data) {
				_this.setState({
					count: _this.state.count + count
				});
			},
			error: function(data) {}
		});
	},
	edit: function(type,id) {
		var _this = this;
		var list = this.state.list;

		if(type == 'append' || type == 'remove') {
			list.map((item) => {
				if(item.id == id) {
					item.checked = type == 'append';
				}
			});
		} else if(type == 'up' || type == 'down'){
			var is_allow = true;

			list.map((item) => {
				if(item.id == id) {
					if((type == 'up' && item.count + 1 > 99) || (type == 'down' && item.count - 1 < 1)) {
						is_allow = false;
						return false;
					}
					item.count = type == 'up' ? (item.count + 1) : (item.count - 1);
				}
			});

			if(!is_allow) {
				return false;
			}

			this.editCart({
				type: type,
				id: id
			}, function() {
				_this.editStorage(list);
				_this.changeFooter(list);
				_this.setState({
					list: list
				});
			});

			return false;
		} else if(type == 'all_append' || type == 'all_remove') {
			list.map((item) => {
				item.checked = type == 'all_append';
			});
		} else if(type == 'delete') {
			let index = 0;
			list.map((item, i) => {
				if(item.id == id) {
					index = i;
				}
			});
			list.splice(index,1);
		}
		this.changeFooter(list);
		this.setState({
			list: list
		});
	},
	handle: function(event,data) {

		if(typeof event != 'object') {
			this[event == 'clearing' ? 'cartClearing' : 'pageUp'](data);
			return false;
		}

		var obj = $(event.currentTarget);
		var name = obj.data('name');
		var id = obj.data('id');

		if(name == 'choose') {
			if(obj.hasClass('active')) {
				this.edit('remove',id);
			} else {
				this.edit('append',id);
			}
		} else if(name == 'up' || name == 'down'){
			this.edit(name,id);
		} else if(name == 'all_choose') {
			obj.hasClass('active') ? this.edit('all_remove',id) : this.edit('all_append',id);
		} else if(name == 'delete') {
			this.edit(name,id);
		}
		Util.stop(event);
	},
	getDefaultProps: function() {
		return ({
			options: {
				mouseWheel: true,
				click: true
			}
		})
	},
	touchStart: function(event) {
		this.page.saveX = event.touches[0].pageX;
		this.page.saveY = event.touches[0].pageY;
	},
	touchMove: function(event) {

		if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;

		var nowX = event.touches[0].pageX;
		var nowY = event.touches[0].pageY;

		let delateX = nowX - this.page.saveX;
		let delateY = nowY - this.page.saveY;

		if(Math.abs(delateX) > Math.abs(delateY) && Math.abs(delateX) > 10) {
			var obj = $(event.currentTarget);
			delateX < 0 && !obj.hasClass('slide') && obj.addClass('slide');
			delateX > 0 && obj.hasClass('slide') && obj.removeClass('slide');
			event.preventDefault();
		}
	},
	//去结算
	cartClearing(data) {
		var _this = this;
		var cart_clearing = ReactDOM.findDOMNode(this.refs.cart_clearing);

		var oLoading = document.getElementById('loading');
		ReactDOM.render(<Loading />, oLoading);

		Util.ajax({
			url: Api['go_clearing'],
			data: data,
			success: function(data) {
				ReactDOM.unmountComponentAtNode(oLoading);

				ReactDOM.render(<Clearing pageUp={_this.pageUp} data={data.data} />, cart_clearing);
				$(cart_clearing).addClass('slide');
			},
			error: function(data) {
				ReactDOM.unmountComponentAtNode(oLoading);
			}
		});
	},
	//返回上一级
	pageUp: function(event) {
		var cart_clearing = ReactDOM.findDOMNode(this.refs.cart_clearing);
		$(cart_clearing).removeClass('slide');

		setTimeout(function() {
			ReactDOM.unmountComponentAtNode(cart_clearing);
		}, 300);

		Util.stop(event);
	},
	render: function(){
		return (
			<div className="cart">
				<Header type="cart" />
				<ReactIScroll iScroll={iScroll} className="scroll_height" options={this.props.options}>
					<ul className="cart_list">
						{
							this.state.list.map(data => {
								return (
									<li className="of-hidden" style={{position: 'relative'}} key={data.id}>
										<div className="animate" onTouchStart={this.touchStart} onTouchMove={this.touchMove}>
											<div className="fl animate_left">
												<div className="fl">
													<span data-name="choose" data-id={data.id} onClick={this.handle} className={data.checked ? 'checkbox active' : 'checkbox'}></span>
												</div>
												<div className="img fl">
													<img src="images/goods.jpg" />
												</div>
												<div className="fl info">
													<p className="title">{data.title}</p>
													<p className="belong_sort">颜色分类:{data.goods_sort}</p>
													<div className="ticket">
														<span className="c-red">¥{data.price}</span>
														<div className="fr num">
															<a data-name="down" data-id={data.id} onClick={this.handle}>-</a>
															<input data-name="input" data-id={data.id} value={data.count} onChange={this.handle} />
															<a data-name="up" data-id={data.id} onClick={this.handle}>+</a>
														</div>
													</div>
												</div>
											</div>
											<div className="remove fl" data-name="delete" data-id={data.id} onClick={this.handle}>
												删除
											</div>
										</div>
									</li>
								);
							})
						}
					</ul>
				</ReactIScroll>
				<Footer handle={this.handle} state={this.state} type="cart" />
				<div ref="cart_clearing" className="cart_clearing"></div>
			</div>
		)
	}
})