import React from 'react'
import ReactDOM from 'react-dom'

import Header from './Header'
import Detail from './Detail'

import ReactIScroll from 'react-iscroll'
var iScroll = require('iscroll');

const Item = React.createClass({
	render() {
		return (
			<li className="clearfix common" onClick={this.props.handle} data-id={this.props.data.id}>
				<div className="img fl">
					<img src="images/goods.jpg" />
				</div>
				<div className="fl info">
					<p className="title">{this.props.data.title}</p>
					<p className="money">¥{this.props.data.price}</p>
					<p className="comment">
						<span>{this.props.data.comment_num}条评论</span>
						<span className="good_percent">好评{this.props.data.comment_percent}%</span>
					</p>
				</div>
			</li>
		)
	}
})

const List = React.createClass({
	getInitialState: function () {
		return {
			list: []
		}
	},
	componentDidMount() {
		this.getList();
		Util.setHeight();
	},
	getList: function() {
		var _this = this;
		Util.ajax({
			url: Api['get_goods_list'],
			success: function(data) {
				_this.setState({
					list: data.data
				});
			},
			error: function(data) {}
		});
	},
	lookDetail(event) {
		var obj = $(event.currentTarget);
		var id = obj.data('id');
		var detail = ReactDOM.findDOMNode(this.refs.detail);

		ReactDOM.render(<Detail pageUp={this.pageUp} id={id} />, detail);
		$(detail).addClass('slide');

		Util.setHeight().stop(event);
	},
	pageUp: function(event) {
		var detail = ReactDOM.findDOMNode(this.refs.detail);
		$(detail).removeClass('slide');

		setTimeout(function() {
			ReactDOM.unmountComponentAtNode(detail);
		}, 300);

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
	//排序
	sortHandle: function(event){
		var obj = $(event.currentTarget);
		obj.siblings().removeClass('active');
		obj.addClass('active');

		this.setState({
			list: this.state.list.reverse().slice(0,5)
		});
	},
	render(){
		return (
			<div>
				<div className="goods_list" ref="main">
					<Header type="goods_list" {...this.props} handle={this.sortHandle} />
					<ReactIScroll iScroll={iScroll} className="scroll_height" options={this.props.options}>
						<ul className="list">
							{
								this.state.list.map(data => {
									return <Item handle={this.lookDetail} data={data} key={data.id} />
								})
							}
						</ul>
					</ReactIScroll>
				</div>
				<div ref="detail" className="goods_detail_wrp"></div>
			</div>
		)
	}
})

export default List