import React,{useState} from 'react';
import LoginRoute from './../../../Routes/LoginRoute.jsx'
import {useDispatch} from 'react-redux'
import {loadingAction} from './../../../ducks/userDuck.js'
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    Grid,
    makeStyles,
    TextField,
    Box,
    Avatar,
    Divider
    
} from '@material-ui/core'
import {
  deepOrange,
  blue
} from '@material-ui/core/colors';
//start useStyles
  const useStyles = makeStyles(theme => ({
    loginCard: {
      margin: '0',
      height : '720px',
    },
    cardImg:{
      backgroundImage : "url('./../../images/backgrounds/fondo.jpg')",
      backgroundSize:'cover',
      backgroundPosition: 'center',
    },
    cardMargin:{
      marginTop:'10px'
    },
    btnActions:{
      color: blue[400],
      marginLeft: '10px'
    },
    avatarLarge: {
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
  }))
//end useStyles
const Login = ({history}) => {
  //start uses
  const classes = useStyles()
  const dispatch = useDispatch()
//start uses
// start elements
//start Copyright
const Copyright = (
<>
  <Typography align="center" variant="caption" display="block" gutterBottom>
    Copyright SAVURG 2020.
  </Typography>
</>
);
//end Copyright
//start aditional actions
const actionsButtons = (
<>
  <Grid
    container
    direction="column"
    justify="center"
    alignItems="center"
    >
    <Button onClick={() => location.href="/auth/recoverpassword"} className={classes.btnActions} size="small">
      ¿olvidaste tú contraseña? 
    </Button>
    <Button onClick={() => location.href="/auth/register"} className={classes.btnActions} size="small">
        Registrate
    </Button>
    
  </Grid>
</>
);
//end aditional actions
//start card Login element
const cardLogin = (
<>  <Grid 
      container
      direction="row"
      justify="center"
      alignItems="center" 
      className={classes.cardMargin}>
      <Grid 
      item
      xs={12}>
        <CardContent>
          <Grid 
            container
            direction="column"
            justify="center"
            alignItems="center">     
            <Avatar className={classes.avatarLarge} alt="Remy Sharp" src="./../../images/backgrounds/savurg.png" />
          </Grid>
            <Typography align="center" gutterBottom variant="h5" component="h2">
              Savurg 
            </Typography>
            <Typography  align="center" variant="body2" color="textSecondary" component="p">
              Sistema de Aula Virtual para la Universidad Rómulo Gallegos
            </Typography>
            <LoginRoute history={history}></LoginRoute>
              {Copyright}
          </CardContent>
      </Grid>
    </Grid>
</>
);
//end card login element
//start card element
const card = (
    <Card className={classes.loginCard}>
      {cardLogin}
    </Card>
);
//end card element
// end elements
    return (
      <Grid 
      className={classes.cardImg}
      direction="row-reverse"
      justify="flex-start"
      alignItems="center"
      container >
        <Grid item xs={12} sm={6} md={4}>
          {card}
        </Grid> 
      </Grid>
    );
}

export default Login;