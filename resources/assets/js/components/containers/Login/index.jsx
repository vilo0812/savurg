import React,{useState} from 'react';
import BoxLogin from './../../boxes/BoxLogin.jsx'
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
      backgroundImage : "url('./../../images/backgrounds/notes_pc.jpg')",
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
function Login() {
  //start uses
  const classes = useStyles()
//start uses
// start elements
//start aditional actions
const actionsButtons = (
<>
  <Grid
    container
    direction="row"
    justify="space-evenly"
    alignItems="flex-start"
    >
      <Button className={classes.btnActions} size="small">
        ¿olvidaste tú contraseña? 
      </Button>
      <Button className={classes.btnActions} size="small">
          Registrate
      </Button>
  </Grid>
</>
);
//end aditional actions
//start Copyright
const Copyright = (
<>
  <Typography  align="center" variant="caption" display="block" gutterBottom>
    Copyright 2020.
  </Typography>
</>
);
//end Copyright
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
            <BoxLogin></BoxLogin>
          </CardContent>
      </Grid>
        <Grid 
        item
        xs={12}>
           <CardActions>
              {actionsButtons}
          </CardActions>
        </Grid>
      <br/>
      {Copyright}
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