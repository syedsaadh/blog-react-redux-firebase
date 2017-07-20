import React, { Component } from 'react';
import { connect } from 'react-redux';
import {isEmpty as _isEmpty} from 'lodash';
import { fetchPostsIfNeeded, fetchPosts } from '../actions'
import PostList from '../components/PostsList'

class App extends Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchPostsIfNeeded())
    }
    handleRefresh(e) {
        const { dispatch } = this.props
        e.preventDefault();
        dispatch(fetchPosts())
    }
    
    render() {
        const { items, isFetching } = this.props;
        const isEmpty = _isEmpty(items);
        return (
            <div>
                {
                    !isFetching &&
                    <button onClick={this.handleRefresh.bind(this)}>Refresh</button>
                }
                {
                    isFetching && <h1>Loading...</h1>  
                }
                {
                    !isEmpty && <PostList posts={items.posts} dispatch= {this.props.dispatch}/>
                }
                {/* <Route path="/post/:slug" component={ArticlePage} /> */}
            </div>
        )
    };
}
const mapStateToProps = state => {
    const { postsFromFirebase } = state;
    const { isFetching, lastUpdated, items } = postsFromFirebase;

    return {
        items,
        isFetching,
        lastUpdated
    }
}
export default connect(mapStateToProps)(App);