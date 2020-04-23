import axios from "axios";
const FETCH_REQUEST = "FETCH_REQUEST"
const FETCH_SUCCESS = "FETCH_SUCCESS"
const FETCH_FAILED = "FETCH_FAILED"


const fetchCategoryRequest = (query) =>{
    return{
        type:FETCH_REQUEST,
        query:query || ''
    }
    }
const fetchCategorySuccess = (data) =>{
        return{
            type:FETCH_SUCCESS,
            data:data
        }
    }
    
const fetchCategoryFailure = (error) =>{
        return{
            type:FETCH_FAILED,
            error
        }
    }

const getCategory = (url) =>{
        return dispatch =>{
            dispatch(fetchCategoryRequest)
            return axios
            .get(url)
            .then(res=>{
                console.log(res)
                return dispatch(fetchCategorySuccess(res.data))
            })
            .catch(res=>{
                return dispatch(fetchCategoryFailure(res.error))
            })
        }
    }
const addCategory = (url,payload) =>{
    console.log(payload)
    return dispatch =>{
        dispatch(fetchCategoryRequest)
        return axios
        .post(url,payload)
        .then(res=>{
            console.log(res)
            return dispatch(fetchCategorySuccess(res.data))
        })
        .catch(res=>{
            return dispatch(fetchCategoryFailure(res.error))
        })
    }
}



export  {
FETCH_REQUEST,
FETCH_SUCCESS,
FETCH_FAILED,
getCategory ,
addCategory
}