import React from 'react'
import {
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
const Home = () => {
//start uses
	const classes = useStyles()
//start uses
   return(
       <h1 className={classes.fondo}>Home</h1>
   );

}

export default Home;