import {FETCH_BLOG_REQUEST,
    FETCH_BLOG_SUCCESS,
    FETCH_BLOG_FAILED } from "../redux/BlogAction"


const categoryStore = {
blogs:[]
}

const blogReducer = (state = categoryStore,action) => {

    switch (action.type){
        case FETCH_BLOG_REQUEST:
            return {
                ...state
            }
        case FETCH_BLOG_SUCCESS:
            return{
                ...state,
                blogs:[...action.data.blogs]
            }
        case FETCH_BLOG_FAILED:
            return {
                ...state
            }

        default:
            return state
    }

}

export {blogReducer}
