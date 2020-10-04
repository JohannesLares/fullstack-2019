import { combineReducers, createStore, applyMiddleware  } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificatioReducer'
import thunk from 'redux-thunk'

export const create = () => {
    const reducers = combineReducers({
        anecdotes: reducer,
        notification: notificationReducer,
        filter: filterReducer
    })
    
    return createStore(
        reducers, 
        composeWithDevTools(
            applyMiddleware(thunk)
        )
    )
}