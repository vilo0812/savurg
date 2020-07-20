import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import Layout from './../components/Layout.js'
import Example2 from './../components/Example2.js'
import Example3 from './../components/Example3.js'
import Login from './../components/containers/Login'

import {Provider} from 'react-redux'
import generateStore from './../ducks/store'
const store = generateStore();

const Routes= () => {
	return (
		<Router>
		    <Provider store={store}>
		        <Route path="/" component={Layout} exact/>
		        <Route path="/example2" component={Example2} exact/>
		        <Route path="/example3" component={Example3} exact/>
		        <Route path="/Login" component={Login} exact/>
		    </Provider>
		</Router>

	);
}

export default Routes