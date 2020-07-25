import React,{useState,Fragment} from 'react';
import axios from 'axios';
import {loginAccion, cerrarSessionAction} from './../../ducks/userDuck.js'
import {useDispatch} from 'react-redux'
import { useHistory } from "react-router-dom";
import BtnLoginRoutesActionsBox from "./../boxes/BtnLoginRoutesActionsBox.jsx";
import {
    Button,
    TextField,
    Box,
    Grid,
    CircularProgress,
    Typography,
    makeStyles
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
const RegisterBox = () => {
  //start uses
  const classes = useStyles()
  const dispatch = useDispatch()
  let history = useHistory();
  const [validationInputs, setValidationInputs] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email:'',
    password:'',
    name:''
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
    passwordError:{
      error:false,
      message:''
    },
    nameError : {
      error:false,
      message:'',
    }
  });
//start uses
//start handles
// start inputs handles
  const handleInputs = event => {
     if(event.target.name === 'name'){
      setInputs({
        ...inputs,
        name:event.target.value
      })
     }else if(event.target.name === 'email'){
      setInputs({
        ...inputs,
        email:event.target.value
      })
     }else{
        setInputs({
        ...inputs,
        password:event.target.value
      })

     }
    }
// start inputs handles
// start methods
//start validation
const validation = () => {
  let errorName = false;
  let errorEmail = false;
  let errorPassword = false;
  setValidationInputs(false);
  setInputsErrors({
    emailError:{
      error:false,
      message:''
    },
    passwordError:{
      error:false,
      message:''
    },
    nameError : {
      error:false,
      message:'',
    }
  })
  if(inputs.name.length == 0){//vemos si nombre esta lleno
    setInputsErrors({
      ...inputsErrors,
        nameError:{
        error:true,
        message:'nombre obligatorio'
      },
    })
    errorName = true;
  }if(inputs.email.length == 0){//vemos si email esta lleno
    setInputsErrors({
      ...inputsErrors,
        emailError:{
        error:true,
        message:'correo obligatorio'
      },
    })
    errorEmail = true;
  }if(inputs.password.length == 0){//vemos si clave esta lleno
    setInputsErrors({
      ...inputsErrors,
        passwordError:{
        error:true,
        message:'clave obligatoria'
      },
    })
    errorPassword = true;
  }else if(inputs.password.length < 3){//vemos si calve es menor a 3 esta lleno
    setInputsErrors({
      ...inputsErrors,
        passwordError:{
        error:true,
        message:'clave invalida'
      },
    })
    errorPassword = true;
  }
  if(!errorPassword && !errorEmail && !errorName){
    setValidationInputs(true)
  }
}
//end validation
//start loging
  const register = async () => {
    validation()
    if(validationInputs){
    setLoading(true)
      try {
            const res = await axios.post('/api/auth/register',inputs);
            setLoading(false)
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Te has registrado con exito',
              showConfirmButton: false,
              timer: 3000
            }).then(res => {
              dispatch(cerrarSessionAction())
            history.push("/auth");
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
        <TextField type="text" onChange={(e) =>handleInputs(e)} fullWidth id="name" key="name" label="Nombre" variant="outlined" name="name" error={inputsErrors.nameError.error} helperText={inputsErrors.nameError.message}/>
      </Box>  
      <Box my={3}>
        <TextField type="email" onChange={(e) =>handleInputs(e)} fullWidth id="email" key="email" label="Correo" variant="outlined" name="email" error={inputsErrors.emailError.error} helperText={inputsErrors.emailError.message}/>
      </Box>  
      <Box my={3}>
        <TextField type="password" onChange={(e) =>handleInputs(e)} fullWidth id="password" key="password" label="Clave" variant="outlined" name="password" error={inputsErrors.passwordError.error} helperText={inputsErrors.passwordError.message}/>
      </Box>  
      <Box  my={3}>
        <Button onClick={() => register()} fullWidth={true} variant="contained" color="primary" >
                Registrarse
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

export default RegisterBox;