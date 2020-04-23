import axios from "axios";
const FETCH_BLOG_REQUEST = "FETCH_BLOG_REQUEST"
const FETCH_BLOG_SUCCESS = "FETCH_BLOG_SUCCESS"
const FETCH_BLOG_FAILED =  "FETCH_BLOG_FAILED"


const fetchBlogRequest = (query) =>{
    return{
        type:FETCH_BLOG_REQUEST,
        query:query || ''
    }
    }
const fetchBlogSuccess = (data) =>{
        return{
            type:FETCH_BLOG_SUCCESS,
            data:data
        }
    }
    
const fetchBlogFailure = (error) =>{
        return{
            type:FETCH_BLOG_FAILED,
            error
        }
    }

const getBlog = (url) =>{
    // console.log(url)
        return dispatch =>{
            dispatch(fetchBlogRequest)
            return axios
            .get(url)
            .then(res=>{
                // console.log(res)
                return dispatch(fetchBlogSuccess(res.data))
            })
            .catch(res=>{
                return dispatch(fetchBlogFailure(res.error))
            })
        }
    }
const addBlog = (url,payload,token) =>{
    console.log(payload,token)
    return dispatch =>{
        dispatch(fetchBlogRequest)
        return axios
        .post(url,payload,{
            headers:{"Content-Type":"application/json","Authorization":`bearer ${token}`}
        }
            )
        .then(res=>{
            alert(res.data.message)
            return dispatch(fetchBlogSuccess(res.data))
        })
        .catch(res=>{
            return dispatch(fetchBlogFailure(res.error))
        })
    }
}



export  {
FETCH_BLOG_REQUEST,
FETCH_BLOG_SUCCESS,
FETCH_BLOG_FAILED,
addBlog ,
getBlog
}