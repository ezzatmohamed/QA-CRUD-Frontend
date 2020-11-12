import loggedReducer from'./isloggedin'
import {combineReducers} from 'redux'

const AllReducers = combineReducers({
    isLogged:loggedReducer
})

export default AllReducers