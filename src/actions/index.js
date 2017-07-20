import * as firebase from 'firebase';
import { config } from '../firebase.config';
import { each as _each } from 'lodash';

export const REQUEST_ALL_POSTS = 'REQUEST_ALL_POSTS';
export const RECEIVED_ALL_POSTS = 'RECEIVED_ALL_POSTS';
export const FAILED_RECEIVE_POSTS = 'FAILED_RECEIVE_POSTS';

firebase.initializeApp(config);

const database = firebase.database();
const postListRef = database.ref('posts');
const articleRef = database.ref('posts').orderByChild('slug');

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
const shouldFetchPosts = (state) => {
  const posts = state.postsFromFirebase;
  if (!posts.items.posts && !posts.isFetching) {
    return true
  }
  return false;
}

export const fetchPostsIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchPosts(getState())) {
    return dispatch(fetchPosts())
  }
}

export const SELECT_ARTICLE = 'SELECT_ARTICLE';
export const selectArticle = (slug, post) => ({
    type: SELECT_ARTICLE,
    slug,
    post
})

export const REQUEST_ARTICLE = 'REQUEST_ARTICLE';
export const RECEIVED_ARTICLE = 'RECEIVED_ARTICLE';
export const FAILED_RECEIVE_ARTICLE = 'FAILED_RECEIVE_ARTICLE';
export const NOT_FOUND_ARTICLE = 'NOT_FOUND_ARTICLE';

export const requestArticle = (slug) => ({
    type: REQUEST_ARTICLE,
    slug
})

export const receivedArticle = (post) => ({
    type: RECEIVED_ARTICLE,
    post,
    receivedAt: Date.now()
})

export const failedReceiveArticle = () => ({
    type: FAILED_RECEIVE_ARTICLE
})

export const notFoundArticle = () => ({
    type: NOT_FOUND_ARTICLE
})

export const fetchArticle = (slug) => dispatch => {
    dispatch(requestArticle(slug))
    return articleRef.equalTo(slug).once('value')
        .then(response => response.val())
        .then(json => {
            if(!json) return dispatch(notFoundArticle())
            let post = json[Object.keys(json)[0]];
            dispatch(receivedArticle(post))
            dispatch(selectArticle(post.slug, post))
        });

}
