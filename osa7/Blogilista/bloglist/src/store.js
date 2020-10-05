import { combineReducers, createStore, applyMiddleware  } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import thunk from 'redux-thunk'

export const create = () => {
    const reducers = combineReducers({
        notification: notificationReducer,
        blog: blogReducer,
        user: userReducer
    })

    return createStore(
        reducers, 
        composeWithDevTools(
            applyMiddleware(thunk)
        )
    )
}