import axios from "axios";
const FETCH_COMMENT_REQUEST = "FETCH_COMMENT_REQUEST"
const FETCH_COMMENT_SUCCESS = "FETCH_COMMENT_SUCCESS"
const FETCH_COMMENT_FAILED =  "FETCH_COMMENT_FAILED"


const fetchCommentRequest = (query) =>{
    return{
        type:FETCH_COMMENT_REQUEST,
        query:query || ''
    }
    }
const fetchCommentSuccess = (data) =>{
        return{
            type:FETCH_COMMENT_SUCCESS,
            data:data
        }
    }
    
const fetchCommentFailure = (error) =>{
        return{
            type:FETCH_COMMENT_FAILED,
            error
        }
    }

const getComment = (url) =>{
    console.log(url)
        return dispatch =>{
            dispatch(fetchCommentRequest)
            return axios
            .get(url)
            .then(res=>{
                console.log(res)
                return dispatch(fetchCommentSuccess(res.data))
            })
            .catch(res=>{
                return dispatch(fetchCommentFailure(res.error))
            })
        }
    }
const addComment = (url,payload,token) =>{
    console.log(payload,token)
    return dispatch =>{
        dispatch(fetchCommentRequest)
        return axios
        .post(url,payload,{
            headers:{"Content-Type":"application/json","Authorization":`bearer ${token}`}
        }
            )
        .then(res=>{
            alert(res.data.message)
            return dispatch(fetchCommentSuccess(res.data))
        })
        .catch(res=>{
            return dispatch(fetchCommentFailure(res.error))
        })
    }
}



export  {
FETCH_COMMENT_REQUEST,
FETCH_COMMENT_SUCCESS,
FETCH_COMMENT_FAILED,
addComment ,
getComment
}