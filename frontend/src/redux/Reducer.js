import {FETCH_USERS_REQUEST,FETCH_USERS_SUCCESS,FETCH_USERS_FAILURE, 
    LOG_OUT, SET_TOKEN,GET_USERS_SUCCESS,GET_USERS_FAILURE,
    UPLOAD_IMAGE_REQUEST,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAILURE,} from './Action'

const initialStore = {
    query:'',
    error:'',
    token:'',
    isLoggedIn:false,
    user:{},
    msg:''
}

const commonReducer = (state = initialStore,action)=>{
    switch (action.type){
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                query:action.query
            }
        case FETCH_USERS_SUCCESS:
            console.log(action)
            if(!action.data.error){
            return {
                ...state,
                error:state.error,
                token:action.data.token,
                isLoggedIn:true
            }
         }
         else{
             return {
                 ...state,
                 error:state.error,
             }
         }

        case FETCH_USERS_FAILURE:
            return {
                ...state,
                error: action.error
            }
        case LOG_OUT:
            localStorage.removeItem('user')
            return{
                ...state,
                isLoggedIn:false,
                token:''
            }
        case SET_TOKEN:
            let user = JSON.parse(localStorage.getItem('user'))
            if(user){
                return {
                    ...state,
                    token:user["token"],
                    isLoggedIn:true
                }
            }
            else{
                return state
            }
        case GET_USERS_SUCCESS:
            return {
                ...state,
                user:{...action.data}
            }
        case GET_USERS_FAILURE:
            return {
                ...state
            }
        case UPLOAD_IMAGE_REQUEST:
            return {
                ...state,
            }
        case UPLOAD_IMAGE_SUCCESS:
            return {
                ...state,
                msg:action.data.path
            }
        case UPLOAD_IMAGE_FAILURE:
            return {
                ...state
            }

        default:
            return state
    }
}

export {commonReducer}





