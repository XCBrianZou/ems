import { applyMiddleware, combineReducers, createStore } from 'redux'
// import thunk from 'redux-thunk'

import roleReducer from './reducers/UserRoles'
import reportReducer from './reducers/Reports'


const allReducer = combineReducers({
    role: roleReducer,
    reports: reportReducer,
})

// export default createStore(allReducer, applyMiddleware(thunk))
export default createStore(allReducer)