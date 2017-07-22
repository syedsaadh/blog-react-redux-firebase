import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty as _isEmpty } from 'lodash';
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
            <div className="container">
                {
                    !isFetching &&
                    <button type="button" className="btn btn-primary pull-right" onClick={this.handleRefresh.bind(this)}>Refresh</button>
                }
                {
                    isFetching && <h2>Loading...</h2>
                }
                {
                    !isEmpty && <div className="container" style={{ opacity: isFetching ? 0.2 : 1 }}>
                        <PostList posts={items.posts} dispatch={this.props.dispatch} />
                    </div>
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