import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

// Apply the middleware to the store
 import userDuck from './userDuck.js'
 const rootReducer = combineReducers ({
 	user : userDuck,

 })

 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

 export default function generateStore(){
 	const store = createStore( rootReducer,composeEnhancers(applyMiddleware(thunk)))
 	return store;
 }