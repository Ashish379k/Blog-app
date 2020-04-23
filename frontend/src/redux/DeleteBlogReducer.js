import {DELETE_BLOG_REQUEST,
    DELETE_BLOG_SUCCESS,
    DELETE_BLOG_FAILED } from "../redux/BlogAction"


const categoryStore = {
message:''
}

const blogDeleteReducer = (state = categoryStore,action) => {

    switch (action.type){
        case DELETE_BLOG_REQUEST:
            return {
                ...state
            }
        case DELETE_BLOG_SUCCESS:
            return{
                ...state,
             msg:action.data.message
            }
        case DELETE_BLOG_FAILED:
            return {
                ...state
            }

        default:
            return state
    }

}

export {blogDeleteReducer}
