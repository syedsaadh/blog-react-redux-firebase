import {
    combineReducers
} from 'redux'
import session from './sessionReducer'
import {
    RECEIVED_ALL_POSTS,
    REQUEST_ALL_POSTS,
    FAILED_RECEIVE_POSTS,
    SELECT_ARTICLE,
    REQUEST_ARTICLE,
    RECEIVED_ARTICLE,
    FAILED_RECEIVE_ARTICLE,
    NOT_FOUND_ARTICLE
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
        case FAILED_RECEIVE_POSTS: {
            return { ...state, isFetching: false }
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
const initialArticleFromFirebase = {
    isFetching: false,
    notFound: false,
    post: {}
}
const articleFromFirebase = (state = initialArticleFromFirebase, action) => {
    switch (action.type) {
        case REQUEST_ARTICLE: {
            return { ...state, isFetching: true }
        }
        case RECEIVED_ARTICLE: {
            return { ...state, isFetching: false, post: action.post }
        }
        case FAILED_RECEIVE_ARTICLE: {
            return { ...state, isFetching: false }
        }
        case NOT_FOUND_ARTICLE: {
            return { ...state, isFetching: false, notFound: true };
        }
        default:
            return state;
    }
}
const rootReducer = combineReducers({
    postsFromFirebase,
    selectedArticle,
    articleFromFirebase,
    session
})

export default rootReducer