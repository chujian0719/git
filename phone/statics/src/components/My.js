import React from 'react'
import Footer from './Footer'

export default React.createClass({
	getInitialState: function () {
		return {}
	},
	componentDidMount: function() {
		Util.setHeight();
	},
	render: function(){
		return (
			<div className="my">
				<div>
				<header className="p-r">
					<div className="header_img">
						<img src="images/header_img.png" />
					</div>
					<div className="my_info">
						<span className="my_img fl">
							<img src="images/defaul.png" />
						</span>
						<div className="my_person_info p-r">
							<p>502751002</p>
							<p>钻石会员</p>
							<div className="head_message">
								<span>账户管理、收货地址</span>
							</div>
						</div>
					</div>
				</header>
				<div className="my_order">
					<div className="my_title">
						<strong>我的订单</strong>
						<span className="fr">
							<span className="fl">全部订单</span>
							<span className="arrow"></span>
						</span>
					</div>
					<ul className="my_content clearfix">
						<li>
							<span className="my_icon icon-wait_pay"></span>
							<p>待付款</p>
						</li>
						<li>
							<span className="my_icon icon-wait_receive"></span>
							<p>待收货</p>
						</li>
						<li>
							<span className="my_icon icon-problem"></span>
							<p>返修退货</p>
						</li>
					</ul>
				</div>
				<div className="my_money">
					<div className="my_title">
						<strong>我的资产</strong>
						<span className="arrow"></span>
					</div>
					<ul className="my_content clearfix">
						<li>
							<p>0.00</p>
							<p>购物币</p>
						</li>
						<li>
							<p>0.00</p>
							<p>购物金</p>
						</li>
						<li>
							<p>0.00</p>
							<p>购物补贴</p>
						</li>
					</ul>
				</div>
				<div className="other_list">
					<ul>
						<li>
							<span>流水记录</span>
							<span className="arrow"></span>
						</li>
						<li>
							<span>我的关注</span>
							<span className="arrow"></span>
						</li>
						<li>
							<span>意见反馈</span>
							<span className="arrow"></span>
						</li>
						<li>
							<span>更多</span>
							<span className="arrow"></span>
						</li>
					</ul>
				</div>
				</div>
				<Footer />
			</div>
		)
	}
})