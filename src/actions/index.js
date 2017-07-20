import * as firebase from 'firebase';
import { config } from '../firebase.config';
import { each as _each } from 'lodash';

export const REQUEST_ALL_POSTS = 'REQUEST_ALL_POSTS';
export const RECEIVED_ALL_POSTS = 'RECEIVED_ALL_POSTS';
export const FAILED_RECEIVE_POSTS = 'FAILED_RECEIVE_POSTS';

firebase.initializeApp(config);

const database = firebase.database();
const postListRef = database.ref('posts');

export const requestAllPosts = () => ({
    type: REQUEST_ALL_POSTS
})

export const receivedAllPosts = (json) => ({
    type: RECEIVED_ALL_POSTS,
    payload: {
        posts: json
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
            let articles = [];
            _each(json, (article) => articles.push(article))
            dispatch(receivedAllPosts(articles))
        });

}

export const SELECT_ARTICLE = 'SELECT_ARTICLE';
export const selectArticle = (slug, post) => ({
    type: SELECT_ARTICLE,
    slug,
    post
})