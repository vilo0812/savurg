import React,{useState,Fragment} from 'react';
import axios from 'axios';
import BtnLoginRoutesActionsBox from "./../boxes/BtnLoginRoutesActionsBox.jsx";
import {useDispatch} from 'react-redux'
import {loginAccion} from './../../ducks/userDuck.js'
import {
    Button,
    TextField,
    Box,
    makeStyles,
    Grid,
    CircularProgress,
    Typography
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import {
  yellow,
  deepOrange,
  blue
} from '@material-ui/core/colors';
//start useStyles
  const useStyles = makeStyles(theme => ({
    btnActions:{
      color: blue[400],
      marginLeft: '10px'
    },
    spinning: {
      marginLeft: theme.spacing(2),
  },
  }))
//end useStyles
const LoginBox = () => {
  //start uses
  const classes = useStyles()
  const [validationInputs, setValidationInputs] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email:'',
    password:''
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
    }
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
     }else{
        setInputs({
        ...inputs,
        password:event.target.value
      })
     }
    }
// end inputs handles
// start methods
//start validation
const validation = () => {
  let errorEmail = false;
  let errorPassword = false;
  setInputsErrors({
    emailError:{
      error:false,
      message:''
    },
    passwordError:{
      error:false,
      message:''
    }
  })
  if(inputs.email.length == 0){//vemos si email esta lleno
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
  if(!errorPassword && !errorEmail){
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
            const res = await axios.post('/api/auth/login',inputs);
            setLoading(false)
            dispatch(loginAccion(res.data))
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Tu sesión ha sido creada con exito',
              showConfirmButton: false,
              timer: 3000
            }).then(res => {
              location.href="/";
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
      <Box my={3}>
        <TextField type="password" onChange={(e) =>handleInputs(e)} fullWidth id="password" key="password" label="Clave" variant="outlined" name="password" error={inputsErrors.passwordError.error} helperText={inputsErrors.passwordError.message}/>
      </Box>  
      <Box  my={3}>
        <Button onClick={() => loging()} fullWidth={true} variant="contained" color="primary" >
                Iniciar Sesión
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

export default LoginBox;