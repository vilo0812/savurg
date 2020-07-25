import React,{Fragment} from 'react'
import {
 BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import {
	CircularProgress,
	Grid,
	Typography,
	Box,
	makeStyles,
} from '@material-ui/core';
import {loginAccion} from './../ducks/userDuck.js'
import {Provider} from 'react-redux'
import generateStore from './../ducks/store';
const store = generateStore();

import Home from './../components/containers/Home'
import Login from './../components/containers/Login'
// start useStyles
const useStyles = makeStyles((theme) => ({
  spinning: {
      marginLeft: theme.spacing(4),
  },
}));
//end useStyles
const Routes= () => {
// start uses
const classes = useStyles();
const [login, setLogin] = React.useState(true)
const [loading, setLoading] = React.useState(true)
// const dispatch = useDispatch()
// start uses
React.useEffect(() => {
    const fetchUser = async () => {
	      const user = await JSON.parse(localStorage.getItem('user'))
	      if(user){
	      loginAccion(user)(store.dispatch)
	      setLogin(true)
	      setLoading(false)
	      }else{
		  	setLogin(false)
		    setLoading(false)
	      }
    } 
    fetchUser()
  }, [])
// start Components
//start protegemos las rutas
 const RouteProtec = ({component, path, ...rest}) => {
    if(login){
        return <Route component={component} path={path} {...rest} />
    }else{
      return <Redirect to="/auth" {...rest} />
    }
  }
//end protegemos las rutas
// start Components
	return (
	<Fragment>
  	{ 
  		loading === true ? (
  		<Grid
		  container
		  direction="row"
		  justify="center"
		  alignItems="center"
			>
		      <CircularProgress className={classes.spinning} />
		      <Box mt={2} ml={2}>
			      <Typography variant="h4" gutterBottom>
			         Cargando...
			      </Typography>
		      </Box>
		</Grid>
		) : (
	<Provider store={store}>
		<Router>
			<Switch>	
		        <RouteProtec path="/" component={Home} exact/>
		        <Route path="/auth" component={Login} />
		    </Switch>
		</Router>
	</Provider>
		)
	}
	</Fragment>
	);
}

export default Routes