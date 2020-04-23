import {createStore,applyMiddleware,compose,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {commonReducer} from './Reducer'
import {categoryReducer} from "./Categoryreducer"
import {blogReducer} from "./BlogReducer"
import {commentReducer} from "./commentReducer"


const rootReducer = combineReducers({commonReducer:commonReducer,categoryReducer:categoryReducer,blogReducer:blogReducer,commentReducer:commentReducer})


const store = createStore(rootReducer,
   compose(applyMiddleware(thunk),
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() ))

export {store}