import React,{useState,Fragment} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from "react-router-dom";
import {loginAccion,passwordRecoverAction} from './../../ducks/userDuck.js'
import BtnLoginRoutesActionsBox from "./../boxes/BtnLoginRoutesActionsBox.jsx";
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
const VerifyCodeBox = () => {
  //start uses
  const pass = useSelector(store => store.user.pass_recover.pass)
  const email = useSelector(store => store.user.pass_recover.email)
  const [validationInputs, setValidationInputs] = useState(false);
   const [loading, setLoading] = useState(false);
  let history = useHistory();
  const classes = useStyles()
  const [inputs, setInputs] = useState({
    token:'',
    email:''
  })
  const [error, setError] = useState({
    status:'',
    error:false
  });
  const [inputsErrors, setInputsErrors] = useState({
    tokenError:{
      error:false,
      message:''
    }
  });
  const dispatch = useDispatch()
  //end uses
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
//start uses
//start handles
// start inputs handles
  const handleInputs = event => {
     if(event.target.name === 'token'){
        setInputs({
        ...inputs,
        token:event.target.value
      })
     }
    }
// start inputs handles
// start methods
//start validation
const validation = () => {
  let errorToken = false;
  setInputsErrors({
    tokenError:{
      error:false,
      message:''
    }
  })
  if(inputs.token.length == 0){//vemos si clave esta lleno
     setInputsErrors({
      ...inputsErrors,
        tokenError:{
        error:true,
        message:'clave obligatoria'
      },
    })
    errorToken = true
   }else if(false){//vemos si calve es menor a 3 esta lleno
    setInputsErrors({
      ...inputsErrors,
        tokenError:{
        error:true,
        message:'clave invalida'
      },
    })
    errorToken = true
  }
  if(!errorToken){
    setValidationInputs(true)
  }
}
//end validation
//start loging
  const check = async () => {
    validation()
    if(validationInputs){
      setLoading(true)
        try {
          setInputs({
            ...inputs,
            email:email
          })
            const res = await axios.post('/api/auth/verifyCode',inputs);
           setLoading(false)
           Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Tu codigo ha sido verificado con exito',
              showConfirmButton: false,
              timer: 3000
            }).then(res => {
              history.push("/auth/newpassword");
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
        <TextField type="password" onChange={(e) =>handleInputs(e)} fullWidth id="token" key="token" label="Inrgese su Codigo" variant="outlined" name="token" error={inputsErrors.tokenError.error} helperText={inputsErrors.tokenError.message}/>
      </Box>  
      <Box  my={3}>
        <Button onClick={() => check()} fullWidth={true} variant="contained" color="primary" >
            Ingresa el código
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

export default VerifyCodeBox;