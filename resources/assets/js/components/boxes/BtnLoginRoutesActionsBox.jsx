import React,{useState} from 'react'
import { useHistory,useLocation} from "react-router-dom";
import {
  blue
} from '@material-ui/core/colors';
	import {
    Button,
    Box,
    makeStyles,
    Grid
} from '@material-ui/core'
//start useStyles
  const useStyles = makeStyles(theme => ({
    btnActions:{
      color: blue[400],
      marginLeft: '10px'
    },
  }))
//end useStyles
const BtnLoginRoutesActionsBox = () => {
	// start useStyles
	 let history = useHistory();
  	const classes = useStyles()
  	let location = useLocation();
  	const [path, setPath] = useState({
    login:true,
    register:true,
    recoverPassword:true
  })
	//end uses
	//start useefect
	  React.useEffect(() => {
	  	switch(location.pathname){
            case '/auth':
            	setPath({
				...path,
				login:false
				})
				return;
            case '/auth/register':
	            setPath({
					...path,
					register:false
					})
	            return;
            default: 
             	setPath({
					...path,
					recoverPassword:false
					})
             	return;
        }
	  }, [])
	  //end useefect
	return (
		<Grid
	    container
	    direction="column"
	    justify="center"
	    alignItems="center"
	    >
	{	
		path.recoverPassword &&
	    <Button onClick={() => history.push("/auth/recoverpassword")} className={classes.btnActions} size="small">
	      ¿olvidaste tú contraseña? 
	    </Button>
	}
	{	
		path.register &&
	    <Button onClick={() => history.push("/auth/register")} className={classes.btnActions} size="small">
	        Registrate
	    </Button>
	}
	{	
		path.login &&
	    <Button onClick={() => history.push("/auth")} className={classes.btnActions} size="small">
	        Inicia Sesión
	    </Button> 
	}
  	</Grid>
	);
}

export default BtnLoginRoutesActionsBox;