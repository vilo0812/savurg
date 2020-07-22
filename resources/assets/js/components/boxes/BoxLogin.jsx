import React,{useState} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux'
import {loginAccion} from './../../ducks/userDuck.js'
import {
    Button,
    TextField,
    Box,
    makeStyles,
    
} from '@material-ui/core'
import {
  yellow
} from '@material-ui/core/colors';
import Alert from '@material-ui/lab/Alert';
import {
  deepOrange,
  blue
} from '@material-ui/core/colors';
//start useStyles
  const useStyles = makeStyles(theme => ({
  }))
//end useStyles
const BoxLogin = () => {
  //start uses
  const classes = useStyles()
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
// start inputs handles
// start methods
//start validation
const validation = () => {
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
  if(!inputs.email){//vemos si email esta lleno
    setInputsErrors({
      ...inputsErrors,
        emailError:{
        error:true,
        message:'correo obligatorio'
      },
    })
  }if(!inputs.password){//vemos si clave esta lleno
    setInputsErrors({
      ...inputsErrors,
        passwordError:{
        error:true,
        message:'clave obligatoria'
      },
    })
  }if(inputs.password.length < 3){//vemos si calve es menor a 3 esta lleno
    setInputsErrors({
      ...inputsErrors,
        passwordError:{
        error:true,
        message:'clave invalida'
      },
    })
  }
  if(inputsErrors.emailError.error || inputsErrors.passwordError.error){
      return false;
    }else{
      return true;
    }
}
//end validation
//start loging
  const loging = async () => {
    if(validation()){
        try {
            const res = await axios.post('/api/auth/login',inputs);
            dispatch(loginAccion(res.data))
            location.href="/";
           } catch (error) {
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
    <Box>
    <form>
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
    </form>
    </Box>
    );
}

export default BoxLogin;