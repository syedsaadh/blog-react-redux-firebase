import * as firebase from 'firebase';
export const REQUEST_ALL_POSTS = 'REQUEST_ALL_POSTS';
export const RECEIVED_ALL_POSTS = 'RECEIVED_ALL_POSTS';
export const FAILED_RECEIVE_POSTS = 'FAILED_RECEIVE_POSTS';
import {config} from '../firebase.config'
firebase.initializeApp(config);

const database = firebase.database();
const postListRef = database.ref('posts');

export const requestAllPosts = () => ({
    type: REQUEST_ALL_POSTS
})

export const receivedAllPosts = (json) => ({
    type: RECEIVED_ALL_POSTS,
    payload: {
        posts : json
    },
    receivedAt: Date.now()
})

export const failedReceivePosts = () => ({
    type: FAILED_RECEIVE_POSTS
})

export const fetchPosts = () => dispatch => {
    dispatch(requestAllPosts())
    return postListRef.once('value')
        .then(response => {
            if (response.val()) return response.val();
            console.log('Error');
        })
        .then(json => {
            console.log(json);
            dispatch(receivedAllPosts(json))
        });

}