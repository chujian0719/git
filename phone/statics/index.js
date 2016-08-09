require('babel-polyfill');

import React from 'react'
import {render} from 'react-dom'

import {Router, Route, IndexRoute, hashHistory} from 'react-router'

import App from './src/components/App'

import Index from './src/components/Index'
import Sort from './src/components/Sort'
import Tool from './src/components/Tool'
import Cart from './src/components/Cart'
import My from './src/components/My'
import Address from './src/components/AddressList'

render(
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Index}/>
			<Route path="index" component={Index}/>
			<Route path="sort" component={Sort}/>
			<Route path="Tool" component={Tool}/>
			<Route path="cart" component={Cart}/>
			<Route path="my" component={My}/>
			<Route path="address" component={Address}/>
		</Route>
	</Router>, document.getElementById('wrapper')
)
