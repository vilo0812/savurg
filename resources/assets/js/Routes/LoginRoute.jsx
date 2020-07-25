
import React,{Fragment} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import {
	CircularProgress,
	Grid,
	Typography,
	Box,
	makeStyles,
} from '@material-ui/core';

import LoginBox from './../components/boxes/LoginBox.jsx'
import RegisterBox from './../components/boxes/RegisterBox.jsx'
import RecoverPasswordBox from './../components/boxes/RecoverPasswordBox.jsx'
import VerifyCodeBox from './../components/boxes/VerifyCodeBox.jsx'
import NewPasswordBox from './../components/boxes/NewPasswordBox.jsx'
// start useStyles
const useStyles = makeStyles((theme) => ({
  spinning: {
      marginLeft: theme.spacing(4),
  },
}));
//end useStyles
const LoginRoute= ({history}) => {
// start uses
const classes = useStyles();
const [loading, setLoading] = React.useState(false)
// end uses
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
		<Router>
			<Switch>
			        <Route path="/auth/newpassword" component={NewPasswordBox} exact/>
			        <Route path="/auth/verify" component={VerifyCodeBox} exact/>
			        <Route path="/auth/recoverpassword" component={RecoverPasswordBox} exact/>
			        <Route path="/auth/register" component={RegisterBox} exact/>
			        <Route path="/auth" component={LoginBox} exact/>
		    </Switch>
		</Router>
		)
	}
	</Fragment>
	);
}

export default LoginRoute