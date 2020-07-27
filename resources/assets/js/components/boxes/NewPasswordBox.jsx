import React,{useState,Fragment} from 'react';
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux'
import {passwordRecoverAction,cerrarSessionAction} from './../../ducks/userDuck.js'
import BtnLoginRoutesActionsBox from "./../boxes/BtnLoginRoutesActionsBox.jsx";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
import {
    Button,
    TextField,
    Box,
    makeStyles,
    Grid,
    CircularProgress,
    Typography,
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
const NewPasswordBox = () => {
  //start uses
    let history = useHistory();
  const pass = useSelector(store => store.user.pass_recover.pass)
  const email = useSelector(store => store.user.pass_recover.email)
  const classes = useStyles()
  const [validationInputs, setValidationInputs] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    clave:'',
    repetClave:''
  })
  const [error, setError] = useState({
    status:'',
    error:false
  });
  let [inputsErrors, setInputsErrors] = useState({
    firstError:{
      error:false,
      message:''
    },
    secondaryError:{
      error:false,
      message:''
    }
  });
  const dispatch = useDispatch()
//start uses
//start useefect
  //start useefect
  React.useEffect(() => {
     const fetchPassword_recover = async () => {
        const password_recover = await JSON.parse(localStorage.getItem('pass_recover'))
        if(!password_recover.pass){
          history.push("/auth/recoverpassword");
        }if(!pass){
          dispatch(passwordRecoverAction(password_recover.email))
        }
    } 
    fetchPassword_recover()
  }, [])
  //end useefect
//start handles
// start inputs handles
  const handleInputs = event => {
     if(event.target.name === 'clave'){
        setInputs({
        ...inputs,
        clave:event.target.value
      })
     }else{
        setInputs({
        ...inputs,
        repetClave:event.target.value
      })
     }
    }
// start inputs handles
// start methods
//start validation
const validation = () => {
  let error = false;
  setInputsErrors({
    firstError:{
      error:false,
      message:''
    },
    secondaryError:{
      error:false,
      message:''
    }
  })
  if(inputs.repetClave != inputs.clave){
  setInputsErrors({
    firstError:{
      error:true,
      message:'las claves no coinciden'
    },
    secondaryError:{
      error:true,
      message:'las claves no coinciden'
    }
  })
  error = true;
  }

  if(inputs.repetClave.length == 0){
    setInputsErrors({
    ...inputsErrors,
    secondaryError:{
      error:true,
      message:'clave obligatoria'
    }
  })
    error = true;
  }
  else if(inputs.repetClave.length < 3){
  setInputsErrors({
    ...inputsErrors,
    secondaryError:{
      error:true,
      message:'clave invalida'
    }
  })
  error = true;
  }
    if(inputs.clave.length == 0){
  setInputsErrors({
  ...inputsErrors,
  firstError:{
      error:true,
      message:'clave obligatoria'
    },
  })
  error = true;
  }
  else if(inputs.clave.length < 3){
  setInputsErrors({
  ...inputsErrors,
  firstError:{
      error:true,
      message:'clave invalida'
    },
  })
  error = true;
  }
  if(!error){
    setValidationInputs(true)
  }
}
//end validation
//start loging
  const changePass = async () => {
    validation()
    if(validationInputs){
      setLoading(true)
        try {
          const data = {
            password:inputs.clave,
            email:email
          };
          const res = await axios.put('/api/auth/newPassword',data);
          setLoading(false)
          dispatch(cerrarSessionAction())
           Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Tu contraseña ha sido cambiada con exito',
              showConfirmButton: false,
              timer: 3000
            }).then(res => {
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
        <TextField 
        type="password" 
        onChange={(e) =>handleInputs(e)} 
        fullWidth 
        id="password" 
        key="password" 
        label="Clave" 
        variant="outlined" 
        name="clave" 
        error={inputsErrors.firstError.error} 
        helperText={inputsErrors.firstError.message}/>
      </Box>  
      <Box my={3}>
         <TextField 
        type="password" 
        onChange={(e) =>handleInputs(e)} 
        fullWidth 
        id="repetClave" 
        key="repetClave" 
        label="Repetir Clave" 
        variant="outlined" 
        name="repetClave" 
        error={inputsErrors.secondaryError.error} 
        helperText={inputsErrors.secondaryError.message}/>
      </Box>  
      <Box  my={3}>
        <Button onClick={() => changePass()} fullWidth={true} variant="contained" color="primary" >
            Cambiar Clave
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

export default NewPasswordBox;