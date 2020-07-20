//start data inicial
    const dataInicial = {
        loading: false,
        login: false
    }
//end data inicial
//start constantes
    const LOADING = 'LOADING'
    const LOGIN = 'LOGIN'
    const USER_EXITO = 'USER_EXITO'
    const USER_ERROR = 'USER_ERROR'
    const CERRAR_SESION = 'CERRAR_SESION'
//end constantes
//start reducer
    export default function userReducer (state = dataInicial, action){

        switch(action.type){
            case LOADING://mientras carga alguno de los siguientes
                return {...state, loading: true}
            case USER_ERROR://si llega a existir un error
                return {...dataInicial}
            case USER_EXITO://iniciar sesion, registrar la sesion, actualizar la sesion
                return {...state, loading: false, login: true, data: action.payload}
            case CERRAR_SESION:// para cerrar la sesion
                return {...dataInicial}
            default: 
                return {...state}
        }

    }
//end reducer
//start actions
export const primeraAccion = (payload) => async(dispatch) => {
	console.log('redux funcionando')
	dispatch({
        type: USER_EXITO,
        payload: {
                email: "gabriel.viloria0812@gmail.com",
                displayName: "vilonk"
         	}
        })
}
//end actions