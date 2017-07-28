import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty as _isEmpty } from 'lodash';
import { fetchPostsIfNeeded, fetchPosts } from '../actions'
import PostList from '../components/PostsList'
import '../styles/App.css';

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
                <div className="post-highlight-section" style={{ opacity: isFetching ? 0.2 : 1 }}>
                {
                    isFetching && <h4>Loading...</h4>
                }
                {
                    !isEmpty && <PostList posts={items.posts} dispatch={this.props.dispatch} />
                }
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