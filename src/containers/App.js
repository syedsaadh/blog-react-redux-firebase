import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions'
import DevTools from './DevTools'

class App extends Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchPosts())
    }
    handleRefresh(e) {
        const { dispatch } = this.props
        e.preventDefault();
        dispatch(fetchPosts())
    }
    render() {
        const { posts } = this.props;
        return (
            <div>
                <DevTools />
                <button onClick={this.handleRefresh.bind(this)}>Refresh</button>
                <p> hello </p>
            </div>
        )
    };
}
const mapStateToProps = state => {
    const { posts } = state;
    const { isFetching, lastUpdated, items } = { isFetching: true, items: {} };

    return {
        posts,
        isFetching,
        lastUpdated
    }
}
export default connect(mapStateToProps)(App);