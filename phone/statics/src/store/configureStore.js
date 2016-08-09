import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {syncHistory} from 'redux-simple-router'

import {hashHistory} from 'react-router'
import rootReducer from '../reducers'

export const reduxRouterMiddleware = syncHistory(hashHistory)

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, //该中间件会让actions支持函数，并且传入dispatch，getState作为参数
  reduxRouterMiddleware
)(createStore)

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState)

    if (module.hot) {
      module.hot.accept('../reducers', () => {
        const nextRootReducer = require('../reducers')
        store.replaceReducer(nextRootReducer)
      })
    }
    return store
}