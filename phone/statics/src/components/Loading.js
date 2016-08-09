import React from 'react'
import ReactDOM from 'react-dom'

export default React.createClass({
	componentDidMount() {

		var value = 1.15 * fontNum;

		var canvas = ReactDOM.findDOMNode(this.refs.canvas);
		var ctx = canvas.getContext('2d');

		canvas.width = value;
		canvas.height = value;

		var radius = 0;
		var radiusArr = [0, 45, 90, 135, 180, 225, 270, 315];
		var colorArr = ['#abf1ab', '#98ee98', '#e9fbe9', '#e1fae1', '#e9fbe9', '#d9f9d9', '#d0f8d0', '#c4f6c4'];

		function arc (radius){
			ctx.save();
			ctx.clearRect(0,0,value,value);
			ctx.translate(value/2,value/2);
			ctx.rotate(Math.PI / 180 * radius);

			for(var i=0; i<radiusArr.length; i++) {

				var cur = Math.PI / 180 * radiusArr[i];

				ctx.beginPath();
				ctx.fillStyle= colorArr[i];

				var smallR = 6 - i * 0.2;
				var r = value/2 - smallR;
				var x =  Math.cos(cur) * r;
				var y =  Math.sin(cur) * r;

				ctx.arc(x, y, smallR, 0, 2*Math.PI);

				ctx.fill();
				ctx.closePath();
			}
			ctx.restore();
		}

		function setOut() {
			setTimeout(function() {
				arc(radius);
				radius = radius + 10;
				setOut();
			}, 30);
		}
		setOut();
	},
	render: function(){
		return (
			<div>
				<div className="hover"></div>
				<div className="content">
					<div className="center">
						<canvas ref="canvas"></canvas>
					</div>
				</div>
			</div>
		)
	}
})