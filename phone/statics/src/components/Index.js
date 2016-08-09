import React from 'react'
import ReactDOM from 'react-dom'

import Loading from './Loading'
import GoodsList from './GoodsList'
import Header from './Header'
import Footer from './Footer'

import ReactIScroll from 'react-iscroll'
var iScroll = require('iscroll');

var Slider = require('react-slick');

const Item = React.createClass({
	render() {
		return (
			<li className="clearfix" onClick={this.props.handle} data-id={this.props.data.id}>
				<p>{this.props.data.name}</p>
				<div className="img fl">
					<img src={this.props.data.src} />
				</div>
			</li>
		)
	}
})

const Index = React.createClass({
	index: 1,
	getInitialState: function () {
		this.index = 1;
		var storage = window.sessionStorage;
		storage && storage.removeItem('cart');

		this.index = 1;
		return {
			images: [],
			notices: [],
			goods: [],
			list: []
		}
	},
	componentDidMount() {
		Util.setHeight();

		this.get_images();
		this.get_notice();
		this.get_special_goods();
		this.getSortList();
	},
	//获得轮播图
	get_images: function() {
		var _this = this;
		Util.ajax({
			url: Api['get_images'],
			success: function(data) {
				_this.setState({
					images: data.data
				});

			},
			error: function(data) {}
		});
	},
	//获得公告
	get_notice: function() {
		var _this = this;
		Util.ajax({
			url: Api['get_notice'],
			success: function(data) {
				_this.setState({
					notices: data.data
				});
				_this.noticeSlide(data.data);
			},
			error: function(data) {}
		});
	},
	//获得秒杀商品
	get_special_goods: function() {
		var _this = this;
		Util.ajax({
			url: Api['get_special_goods'],
			success: function(data) {
				_this.setState({
					goods: data.data
				});
			},
			error: function(data) {}
		});
	},
	//获得分类列表
	getSortList: function() {
		var _this = this;

		Util.ajax({
			url: Api['get_sort_list'],
			data: {
				type: 2
			},
			success: function(data) {

				var setData = {};
				setData.list = data.data;

				_this.setState(setData);
			},
			error: function(data) {}
		});
	},
	//查看商品列表
	lookList: function(event) {
		var obj = $(event.currentTarget);
		var goods_list = ReactDOM.findDOMNode(this.refs.goods_list);

		ReactDOM.render(<GoodsList pageUp={this.pageUp} id={obj.data('id')} />, goods_list);

		$(goods_list).addClass('slide');
		Util.setHeight();
	},
	pageUp: function(event) {

		var goods_list = ReactDOM.findDOMNode(this.refs.goods_list);
		$(goods_list).removeClass('slide');

		setTimeout(function() {
			ReactDOM.unmountComponentAtNode(goods_list);
		}, 300);

		Util.stop(event);
	},
	//商品头条滚动
	noticeSlide: function(data) {
		var _this = this;

		var oNotice = ReactDOM.findDOMNode(this.refs['notice']),
			oUl = $(oNotice).find('ul').eq(0),
			length = Math.ceil(data.length/2),
			lastLi = oUl.find('li').eq(0),
			height = oNotice.offsetHeight;

		oUl.append(lastLi.clone());

		(function setOut() {
			setTimeout(function() {
				if(!oUl) {
					return false;
				}
				oUl.animate({
					top: -height * _this.index + 'px'
				}, 300, 'linear', function() {
					_this.index ++;
					if(_this.index == length + 1) {
						_this.index = 1;
						oUl.css('top', 0);
					}
					setOut();
				});
			},3000);
		})();
	},
	getDefaultProps: function() {
		return ({
			optionsH: {
				mouseWheel: true,
				click: true
			},
			optionsW: {
				mouseWheel: true,
				scrollX: true,
				click: true
			},
			settings: {
				speed: 500,
				autoplay: false,
				autoplaySpeed: 3000,
				dots: true,
				useCSS: true,
				slidesToShow: 1,
				slidesToScroll: 1
			}
		})
	},
	render(){

		var notices = [];
		var data = this.state.notices;

		for(let i=0,len=data.length; i< len; i = i+2) {
			notices.push(
				<li key={data[i].id}>
					<p>
						<span className="notice_type">
							{Conf.NOTICE_TYPE[data[i].type]}
						</span>
						{data[i].title}
					</p>
				{
					data[i+1] ?
					<p>
						<span className="notice_type">
							{Conf.NOTICE_TYPE[data[i].type]}
						</span>
						{data[i+1].title}
					</p>: null
				}
				</li>
			)
		}

		return (
			<div>
				<div className="index" ref="index">
					<Header />
					<ReactIScroll iScroll={iScroll} className="scroll_height" options={this.props.optionsH}>
						<div>
							<div className="main_header">
								<Slider {...this.props.settings}>
									{
										this.state.images.map(data => {
											return (
												<div key={data.id}>
													<img src={data.src} />
												</div>
											)
										})
									}
								</Slider>
							</div>
							<ul className="clearfix index_sort">
								<li>
									<span className="img">
										<img src="images/index_sort_pay.png" />
									</span>
									<p>充值中心</p>
								</li>
								<li>
									<span className="img">
										<img src="images/index_sort_shop.png" />
									</span>
									<p>超市</p>
								</li>
								<li>
									<span className="img">
										<img src="images/index_sort_logistics.png" />
									</span>
									<p>物流</p>
								</li>
								<li>
									<span className="img">
										<img src="images/index_sort_focus.png" />
									</span>
									<p>我的关注</p>
								</li>
								<li>
									<span className="img">
										<img src="images/index_sort_ticket.png" />
									</span>
									<p>领券</p>
								</li>
								<li>
									<span className="img">
										<img src="images/index_sort_take.png" />
									</span>
									<p>外卖</p>
								</li>
								<li>
									<span className="img">
										<img src="images/index_sort_other.png" />
									</span>
									<p>金融</p>
								</li>
								<li>
									<span className="img">
										<img src="images/index_sort_sort.png" />
									</span>
									<p>分类</p>
								</li>
							</ul>
							<div className="index_notice clearfix">
								<div className="fl in_title">
									<p>商品</p>
									<p>头条</p>
								</div>
								<div className="in_content" ref="notice">
									<ul>
										{notices}
									</ul>
								</div>
							</div>
							<div className="special_goods">
								<div className="sg_title">
									<strong className="title">/ 秒杀 /</strong>
									<span className="time">
										<span>12</span>:
										<span>12</span>:
										<span>12</span>
									</span>
									<span className="fr">更多秒杀</span>
								</div>
								<ReactIScroll iScroll={iScroll} className="sg_content" options={this.props.optionsW}>
									<ul className="clearfix" style={{width: 2.1 * this.state.goods.length + 'rem'}}>
										{
											this.state.goods.map(data => {
												return (
													<li key={data.id}>
														<span className="img">
															<img src={data.src} />
														</span>
														<p className="now_money">¥{data.now_price}</p>
														<p className="once_money">¥{data.old_price}</p>
													</li>
												)
											})
										}
									</ul>
								</ReactIScroll>
							</div>
							{
								this.state.list.map(data => {
									return (
										<div className="hot_list" key={data.id}>
											<div className="hl_title">
												<span className="title">{data.name}</span>
												{/*<span className="fr">更多</span>*/}
											</div>
											<ul className="clearfix">
												{
													data.data.map(item => {
														return <Item handle={this.lookList} data={item} key={item.id} />
													})
												}
											</ul>
										</div>
									)
								})
							}
						</div>
					</ReactIScroll>
					<Footer />
				</div>
				<div ref="goods_list" className="common_wrp goods_list_wrp"></div>
			</div>
		)
	}
})

export default Index