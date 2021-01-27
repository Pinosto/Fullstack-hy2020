const initialState=''

const reducer =(state=initialState, action)=>{
    console.log(`filterredu`,action)

    switch (action.type){
        case 'SET_FILTER':
            return action.filter
        case 'RESET_FILTER':
            return initialState
        default:
            return state
    }
}

export const filterChange = filter => {
    return {
        type: 'SET_FILTER',
        filter,
    }
}

export const filterReset = filter => {
    return {
        type: 'RESET_FILTER',
    }
}

export default reducer