import {
    combineReducers
} from 'redux'
import {
    RECEIVED_ALL_POSTS,
    REQUEST_ALL_POSTS,
    FAILED_RECEIVE_POSTS
} from '../actions'

const initialState = {
    isFetching: false,
    items: {}
}
const posts = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_ALL_POSTS:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVED_ALL_POSTS:
            return {
                ...state,
                isFetching: false,
                items: action.payload,
                lastUpdated: action.receivedAt
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    posts
})

export default rootReducer