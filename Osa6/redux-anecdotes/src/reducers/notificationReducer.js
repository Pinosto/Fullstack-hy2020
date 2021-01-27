const initialState = ''

const reducer = (state = initialState, action) => {
    console.log(`noteredu`, action)
    switch (action.type) {
        case 'ADD_NOTIFICATION':
            state.timeOut!==undefined&&clearTimeout(state.timeOut)
            return action.data
        case 'REMOVE_NOTIFICATION':
            return initialState
        default:
            return state
    }
}

export const addNotification = (notification, time) => {
    return async dispatch => {
        const timeOut=setTimeout(() => { dispatch(removeNotification()) }, time*1000);
        dispatch({
            type: 'ADD_NOTIFICATION',
            data: {
                notification,
                timeOut,
            }
        })
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION'
    }
}


export default reducer