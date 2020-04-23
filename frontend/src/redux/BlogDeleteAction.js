import axios from "axios";
const DELETE_BLOG_REQUEST = "DELETE_BLOG_REQUEST"
const DELETE_BLOG_SUCCESS = "DELETE_BLOG_SUCCESS"
const DELETE_BLOG_FAILED =  "DELETE_BLOG_FAILED"


const deleteBlogRequest = (query) =>{
    return{
        type:DELETE_BLOG_REQUEST,
        query:query || ''
    }
    }
const deleteBlogSuccess = (data) =>{
        return{
            type:DELETE_BLOG_SUCCESS,
            data:data
        }
    }
    
const deleteBlogFailure = (error) =>{
        return{
            type:DELETE_BLOG_FAILED,
            error
        }
    }

const deleteBlog = (url,token) =>{
    console.log(token)
    const payload = {}
    return dispatch =>{
        dispatch(deleteBlogRequest)
        return axios
        .post(url,payload,{
            headers:{"Authorization":`bearer ${token}`}
        }
            )
        .then(res=>{
            alert(res.data.message)
            return dispatch(deleteBlogSuccess(res.data))
        })
        .catch(res=>{
            return dispatch(deleteBlogFailure(res.error))
        })
    }
}



export  {
DELETE_BLOG_REQUEST,
DELETE_BLOG_SUCCESS,
DELETE_BLOG_FAILED,
deleteBlog ,
}