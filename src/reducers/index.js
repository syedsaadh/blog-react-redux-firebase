import {
    combineReducers
} from 'redux'
import {
    RECEIVED_ALL_POSTS,
    REQUEST_ALL_POSTS,
    FAILED_RECEIVE_POSTS,
    SELECT_ARTICLE
} from '../actions'

const initialState = {
    isFetching: false,
    items: {}
}
const postsFromFirebase = (state = initialState, action) => {
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
const initialSelectedPost = {
    slug: '',
    post: {}
}
const selectedArticle = (state = initialSelectedPost, action) => {
    switch (action.type) {
        case SELECT_ARTICLE:
            return {
                ...state,
                slug: action.slug,
                post: action.post
            };
        default:
            return state
    }
}

const rootReducer = combineReducers({
    postsFromFirebase,
    selectedArticle
})

export default rootReducer