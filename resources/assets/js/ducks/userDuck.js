//start data inicial
    const dataInicial = {
        loading: false,
        login: false,
        data:{}
    }
//end data inicial
//start constantes
    const LOADING = 'LOADING'
    const USER_EXITO = 'USER_EXITO'
    const USER_ERROR = 'USER_ERROR'
    const CERRAR_SESION = 'CERRAR_SESION'
//end constantes
//start reducer
    export default function userReducer (state, action){

        switch(action.type){
            case LOADING:
                return {...state, loading: true}
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
    console.log(payload)
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
//start login
export const loadingAccion = () => async(dispatch) => {
   dispatch({
        type: LOADING
    })
}
//end login
//end actions//
