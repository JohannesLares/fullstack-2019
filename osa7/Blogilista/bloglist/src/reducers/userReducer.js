import loginService from '../services/login'

const userReducer = (state = {name: localStorage.getItem('name'), username: localStorage.getItem('username')}, action) => {
    switch (action.type) {
        case 'LOGIN':
            console.log(action.data)
            localStorage.setItem("token", action.data.token)
            localStorage.setItem('username', action.data.username)
            localStorage.setItem('name', action.data.name)
            return action.data
        case 'LOGOUT':
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            localStorage.removeItem('name')
            return null
        default:
            return state
    }
}

export const logIn = (username, password) => {
    return async dispatch => {
        const loggedIn = await loginService.login({username, password})
        console.log(loggedIn)
        dispatch({
            type: 'LOGIN',
            data: loggedIn
        })
    }
}

export const logOut = () => {
    return {
        type: 'LOGOUT',
        data: null
    }
}

export default userReducer