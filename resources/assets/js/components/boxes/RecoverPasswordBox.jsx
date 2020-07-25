import React,{useState, Fragment} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux'
import { useHistory } from "react-router-dom";
import {passwordRecoverAction} from './../../ducks/userDuck.js'
import BtnLoginRoutesActionsBox from "./../boxes/BtnLoginRoutesActionsBox.jsx";
import Swal from 'sweetalert2'
import {
    Button,
    TextField,
    Box,
    makeStyles,
    CircularProgress,
    Typography,
    Grid
    
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import {
  deepOrange,
  blue,
  yellow
} from '@material-ui/core/colors';
//start useStyles
  const useStyles = makeStyles(theme => ({
    spinning: {
      marginLeft: theme.spacing(2),
  },
  }))
//end useStyles
const RecoverPassword = () => {
  //start uses
    let history = useHistory();
  const classes = useStyles()
  const [validationInputs, setValidationInputs] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email:''
  })
  const [error, setError] = useState({
    status:'',
    error:false
  });
  const [inputsErrors, setInputsErrors] = useState({
    emailError:{
      error:false,
      message:''
    },
  });
  const dispatch = useDispatch()
//start uses
//start handles
// start inputs handles
  const handleInputs = event => {
     if(event.target.name === 'email'){
      setInputs({
        ...inputs,
        email:event.target.value
      })
     }
    }
// start inputs handles
// start methods
//start validation
const validation = () => {
  let errorEmail = false;
  setInputsErrors({
    emailError:{
      error:false,
      message:''
    },
  })
  if(!inputs.email){//vemos si email esta lleno
    setInputsErrors({
      ...inputsErrors,
        emailError:{
        error:true,
        message:'correo obligatorio'
      },
    })
    errorEmail = true;
  }
  if(!errorEmail){
    setValidationInputs(true)
  }
}
//end validation
//start loging
  const loging = async () => {
    validation()
    if(validationInputs){
    setLoading(true)
        try {
            const res = await axios.post('/api/auth/recoverPassword',inputs);
            setLoading(false)
            dispatch(passwordRecoverAction(res.data.password_recover.email))
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Tu codigo ha sido enviado con exito',
              showConfirmButton: false,
              timer: 3000
            }).then(res => {
              history.push("/auth/verify");
            })
           } catch (error) {
            setLoading(false)
            setError({
              status: error.response.status,
              error: true
            })
        }
    }
  }
//end loging
// end methods
//end handles
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
          <CircularProgress size={20} className={classes.spinning} />
          <Box mt={2} ml={2}>
            <Typography variant="subtitle1" gutterBottom>
               Cargando...
            </Typography>
          </Box>
    </Grid>
    ) : (
    <Box>
      <Box my={3}>
        <TextField type="email" onChange={(e) =>handleInputs(e)} fullWidth id="email" key="email" label="Correo" variant="outlined" name="email" error={inputsErrors.emailError.error} helperText={inputsErrors.emailError.message}/>
      </Box>
      <Box  my={3}>
        <Button onClick={() => loging()} fullWidth={true} variant="contained" color="primary" >
                Recuperar Contraseña
        </Button>
      </Box>
    { error.error &&
      <Alert variant="filled" severity="warning" >
        { 
          error.status === 401 ? 'datos invalidos' : 'ha ocurrido un error, por favor vuelva a intentarlo'
        }
      </Alert>
    }
    <BtnLoginRoutesActionsBox/>
    </Box>
    )
  }
  </Fragment>
    );
}

export default RecoverPassword;