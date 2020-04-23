import {FETCH_COMMENT_REQUEST,
    FETCH_COMMENT_SUCCESS,
    FETCH_COMMENT_FAILED } from "../redux/commentAction"


const commentStore = {
comments:[]
}

const commentReducer = (state = commentStore,action) => {

    switch (action.type){
        case FETCH_COMMENT_REQUEST:
            return {
                ...state
            }
        case FETCH_COMMENT_SUCCESS:
            return{
                ...state,
                comments:[...action.data.comments]
            }
        case FETCH_COMMENT_FAILED:
            return {
                ...state
            }

        default:
            return state
    }

}

export {commentReducer}
