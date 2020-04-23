import axios from 'axios'
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST"
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS"
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE"
const LOG_OUT = "LOG_OUT"
const SET_TOKEN = "SET_TOKEN"
const GET_USERS_SUCCESS = "GET_USERS_SUCCESS"
const GET_USERS_FAILURE = "GET_USERS_FAILURE"
const UPLOAD_IMAGE_REQUEST = "UPLOAD_IMAGE_REQUEST"
const UPLOAD_IMAGE_SUCCESS = "UPLOAD_IMAGE_SUCCESS"
const UPLOAD_IMAGE_FAILURE = "UPLOAD_IMAGE_FAILURE"
const USER_REGISTERED = "USER_REGISTERED"



const userRegistered = (data) =>{
    return {
        type:USER_REGISTERED,
        data:data
    }
}


const fetchUsersRequest = (query) =>{
return{
    type:FETCH_USERS_REQUEST,
    query:query || ''
}
}
const fetchUsersSuccess = (data) =>{
    return{
        type:FETCH_USERS_SUCCESS,
        data:data
    }
}

const GetUsersSuccess = (data) =>{
    return{
        type:GET_USERS_SUCCESS,
        data:data
    }
}
const GetUsersFailure = (error) =>{
    return{
        type:GET_USERS_FAILURE,
        error
    }
}
const fetchUsersFailure = (error) =>{
    return{
        type:FETCH_USERS_FAILURE,
        error:error
    }
}

const loginUser = (url,payload) =>{

    return dispatch =>{
        dispatch(fetchUsersRequest)
        return axios
        .post(url,payload)
        .then(res=>{
            alert(res.data.user.message)
            // console.log(res.data.user.error)
            if(!res.data.user.error){
                let data = {"isLoggedIn":true,"token":res.data.user.token}
                localStorage.setItem("user",JSON.stringify(data))
                return dispatch(fetchUsersSuccess(res.data))
            }
            else{
                return dispatch(fetchUsersSuccess(res.data.user))
            }

        })
        .catch(res=>{
            return dispatch(fetchUsersFailure(res.data))
        })
    }
}

const createNewUser = (url,payload) =>{
    return dispatch =>{
        dispatch(fetchUsersRequest)
        return axios
        .post(url,payload)
        .then(res=>{
            alert(res.data.message)
            return dispatch(userRegistered(res.data))
        })
        .catch(res=>{
            return dispatch(fetchUsersFailure(res.data))
        })
    }
}
const signOut = () =>{
    return {
        type:LOG_OUT
    }
}
const checkIsLoggedIn = () =>{
     return {
         type:SET_TOKEN
     }
}

const getUser = (url,payload) =>{
    return dispatch =>{
        dispatch(fetchUsersRequest)
        return axios
        .get(url,
            {
                headers:{"Authorization":`bearer ${payload}`,"Content-Type":"application/json"}
            }
            )
        .then(res=>{
            // console.log(res)
            return dispatch(GetUsersSuccess(res.data))
        })
        .catch(res=>{
            return dispatch(GetUsersFailure(res.error))
        })
    }
}

const imageUplaodRequest = (query) =>{
    return{
        type:UPLOAD_IMAGE_REQUEST,
        query:query || ''
    }
    }
const imageUplaodSuccess = (data) =>{
        return{
            type:UPLOAD_IMAGE_SUCCESS,
            data:data
        }
    }
const imageUplaodFailure = (error) =>{
        return{
            type:UPLOAD_IMAGE_FAILURE,
            error:error
        }
    }
const uploadImage = (url,payload,file) =>{
    return dispatch =>{
        dispatch(imageUplaodRequest)
        return axios
        .post(url,file,
            {
                headers:{"Authorization":`bearer ${payload}`,'Content-Type': 'form-data'},
            }
            )
        .then(res=>{
            alert(res.data.msg)
            return dispatch(imageUplaodSuccess(res.data))
        })
        .catch(res=>{
            return dispatch(imageUplaodFailure(res.error))
        })
    }
}



export {FETCH_USERS_REQUEST,FETCH_USERS_SUCCESS,FETCH_USERS_FAILURE,GET_USERS_FAILURE,
    loginUser,createNewUser,signOut,LOG_OUT,checkIsLoggedIn,SET_TOKEN,getUser,
    GET_USERS_SUCCESS,
    UPLOAD_IMAGE_REQUEST,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAILURE,
    uploadImage

}