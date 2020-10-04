const notificationReducer = (state = {notification: '', time: 0}, action) => {
    switch (action.type) {
      case 'UPDATE':
          return action.data
      default:
        return state
    }
}

export const notify = (notification, time) => {
    return dispatch => {
        const t = time * 1000
        dispatch({
            type: 'UPDATE',
            data: { 
                notification,
                time: t
            }
        })
    }
}

export const end = () => {
    return {
        type: 'UPDATE',
        data: {
            notification: '',
            time: 0
        }
    }
}

export default notificationReducer