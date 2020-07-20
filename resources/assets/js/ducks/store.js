import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import userReducer,{primeraAccion} from './userDuck'
 
 const rootReducer = combineReducers ({
 	user: userReducer,
 })

 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

 export default function generateStore(){
 	const store = createStore( rootReducer,composeEnhancers(applyMiddleware(thunk)))
 	primeraAccion()(store.dispatch)
 	return store;
 }