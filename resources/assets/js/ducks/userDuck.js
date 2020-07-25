//start data inicial
    const dataInicial = {
        loading: false,
        login: false,
        currentUserData:{},
        session:{},
        pass_recover:{
            pass:false,
            email:''
        }
    }
//end data inicial
//start constantes
    const LOADING = 'LOADING'
    const USER_EXITO = 'USER_EXITO'
    const USER_PASS_RECOVER = 'USER_PASS_RECOVER'
    const USER_ERROR = 'USER_ERROR'
    const CERRAR_SESION = 'CERRAR_SESION'
//end constantes
//start reducer
    export default function userReducer (state, action){

        switch(action.type){
            case LOADING:
                return {...state, loading: true}
            case USER_PASS_RECOVER:
                return {...state, pass_recover:{
                    pass:true,
                    email:action.payload
                }}
            case USER_ERROR:
                return {...dataInicial}
            case USER_EXITO:
                return {...state, loading: false, login: true, session: action.payload.session, currentUserData:action.payload.data}
            case CERRAR_SESION:
                return {...dataInicial}
            default: 
                return {...dataInicial}
        }
    }
//end reducer
//start actions//
//start login
export const loginAccion = (payload) => async(dispatch) => {
    dispatch({
            type: USER_EXITO,
            payload: {
                session:{
                    access_token: payload.access_token,
                    token_type: payload.token_type,
                    expires_in: payload.expires_in,
                },
                data:payload.user
            }
        })
    localStorage.setItem('user', JSON.stringify({
        access_token: payload.access_token,
        token_type: payload.token_type,
        expires_in: payload.expires_in,
        user: payload.user
    }))
}
//end login
//start LOADING
export const loadingAction = () => async(dispatch) => {
   dispatch({
        type: LOADING
    })
}
//end LOADING
//start CERRAR_SESION
export const cerrarSessionAction = () => async(dispatch) => {
   dispatch({
        type: CERRAR_SESION
    })
   localStorage.removeItem('user');
   localStorage.removeItem('pass_recover');

}
//end CERRAR_SESION
//start password recover
export const passwordRecoverAction = (payload) => async(dispatch) => {
   dispatch({
        type: USER_PASS_RECOVER,
        payload: payload
    })
   localStorage.setItem('pass_recover', JSON.stringify({
        pass:true,
        email:payload
    }))
}
//end password recover
//end actions//

