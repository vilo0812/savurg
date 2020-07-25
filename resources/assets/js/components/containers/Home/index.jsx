import React,{Fragment} from 'react'
import {useDispatch} from 'react-redux'
import {cerrarSessionAction} from './../../../ducks/userDuck.js'
import {
    Button,
    makeStyles,
} from '@material-ui/core'
import {
  deepOrange,
} from '@material-ui/core/colors';
//start useStyles
  const useStyles = makeStyles(theme => ({
  	fondo:{
  		background : deepOrange[500]
  	}
  }))
//end useStyles
const Home = ({history}) => {
  //start uses
  const dispatch = useDispatch();
  //end uses
 // start methods
  const logout = () => {
    dispatch(cerrarSessionAction())
    history.push('/auth')
  }
// end methods
//start uses
	const classes = useStyles()
//start uses
   return(
    <Fragment>
             <h1 className={classes.fondo}>Home 
             </h1>
            <Button variant="contained" onClick={()=>logout()}>
              Link
            </Button>
    </Fragment>
   );

}

export default Home;