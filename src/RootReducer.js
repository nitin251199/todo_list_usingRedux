const initialState = {
    tasks : {}
}

const RootReducer = (state=initialState,action) => {
    switch(action.type)
    {
        case 'ADD_TASK':
            state.tasks[action.payload[0]] = action.payload[1]
            return {tasks: state.tasks} 
        case 'REMOVE_TASK':
            delete state.tasks[action.payload[0]]
            return {tasks: state.tasks}
        default:
            return state
    }

}

export default RootReducer