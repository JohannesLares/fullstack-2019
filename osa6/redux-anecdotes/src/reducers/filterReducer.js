const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'UPDATE_FILTER':
            return action.filter
        default:
            return state
    }
}

export const updateFilter = filter => {
    return {
        type: 'UPDATE_FILTER',
        filter
    }
}

export default filterReducer