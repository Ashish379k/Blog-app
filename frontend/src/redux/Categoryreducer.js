import {FETCH_REQUEST,
    FETCH_SUCCESS,
    FETCH_FAILED } from "../redux/CategoryAction"


const categoryStore = {
category:[]
}

const categoryReducer = (state = categoryStore,action) => {

    switch (action.type){
        case FETCH_REQUEST:
            return {
                ...state
            }
        case FETCH_SUCCESS:
            return{
                ...state,
                category:[...action.data.categories]
            }
        case FETCH_FAILED:
            return {
                ...state
            }

        default:
            return state
    }

}

export {categoryReducer}
