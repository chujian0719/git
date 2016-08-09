import React from 'react'

import Header from './Header'
import Footer from './Footer'

import ReactIScroll from 'react-iscroll'
var iScroll = require('iscroll');
var Slider = require('react-slick');

export default React.createClass({
	getInitialState: function () {
		return {
			images:[]
		};
	},
	componentDidMount: function() {
		this.getDetail();
		Util.setHeight();
	},
	getDetail: function() {
		var _this = this;
		var param = {
			id: this.props.id
		};
		Util.ajax({
			data: param,
			url: Api['get_goods_detail'],
			success: function(data) {
				_this.setState(data.data);
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
	render: function(){
		var settings = {
			speed: 500,
			autoplay: false,
			autoplaySpeed: 3000,
			dots: true,
			useCSS: true,
			slidesToShow: 1,
			slidesToScroll: 1
		};

		return (
			<div id="detail" className="detail">
				<Header type="detail" {...this.props} />
				<ReactIScroll iScroll={iScroll} className="scroll_height" options={this.props.options}>
					<div className="common_padding_top">
						<Slider {...settings} className="img">
							{
								this.state.images.map((item, i) => {
									return (
										<div className="img" key={i}>
											<img src={item} />
										</div>
									)
								})
							}

						</Slider>
						<div className="info common">
							<p className="title">{this.state.title}</p>
							<p className="c-red money">¥{this.state.price}</p>
						</div>
						<div className="coupon">
							<span className="each_title">优惠</span>
							优惠券抵扣 {this.state.coupon}
						</div>
						<div className="interval"></div>
						<div className="other common">
							<p className="address">
								<span className="each_title">送至</span>
								山东省>济南市>长青
							</p>
							<p className="c-red is_have">有货</p>
						</div>
						<div className="interval"></div>
						<div className="comment">
							<div className="comment_head color_shallow">
								<span>评价(10)</span>
								<span className="fr">好评90%</span>
							</div>
							<ul className="comment_list">
								<li>
									<div className="comment_title">
										<span className="comment_star">
											<span></span>
											<span></span>
											<span className="hover"></span>
											<span className="hover"></span>
											<span className="hover"></span>
										</span>
										<span className="fr color_shallow">yueliang</span>
									</div>
									<div className="comment_content">
										哈哈哈哈哈哈哈
									</div>
									<div className="comment_time">2015-09-12</div>
								</li>
								<li>
									<div className="comment_title">
										<span>12345</span>
										<span className="fr color_shallow">yueliang</span>
									</div>
									<div className="comment_content">
										哈哈哈哈哈哈哈
									</div>
									<div className="comment_time">2015-09-12</div>
								</li>
								<li>
									<div className="comment_title">
										<span>12345</span>
										<span className="fr color_shallow">yueliang</span>
									</div>
									<div className="comment_content">
										哈哈哈哈哈哈哈
									</div>
									<div className="comment_time">2015-09-12</div>
								</li>
							</ul>
						</div>
					</div>
				</ReactIScroll>
				<Footer type="detail" id={this.props.id} />
			</div>
		)
	}
})