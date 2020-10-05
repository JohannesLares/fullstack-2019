const notificationReducer = (state = '', action) => {
    switch (action.type) {
      case 'UPDATE':
          return action.notification
      default:
        return state
    }
}

export const notify = notification => {
    return {
        type: 'UPDATE',
        notification
    }
}

export const end = () => {
    return {
        type: 'UPDATE',
        notification: ''
    }
}

export default notificationReducer