import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationsSlice = createSlice({
    name: 'notification',
    initialState,
    reducers:{
        showNotification(state, action){
            const content = action.payload
            console.log(content)
            return content
        },
        hiddenNotification(state, action){
            return ''
        }
    }
})

export const setNotification =   ( message, time = 5000 ) => {
    return async dispatch => {
        dispatch( showNotification(message) )
        setTimeout(() => {
            dispatch( hiddenNotification() )
        }, time*1000 )
    }
}

export const { showNotification,hiddenNotification } = notificationsSlice.actions
export default notificationsSlice.reducer
