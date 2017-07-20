import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as markdown from 'markdown-it';
import renderHtml from 'react-render-html';
import { fetchArticle } from '../actions'
var md = new markdown({
    html: true,
    linkify: true,
    typographer: true
})
class ArticlePage extends Component {
    renderPost() {
        const { post } = this.props;
        return renderHtml(md.render(post.desc || ''));
    }
    componentDidMount() {
        const { dispatch, post, match } = this.props;
        if (!post.desc) {
            dispatch(fetchArticle(match.params.slug))
        }
    }
    render() {
        const { isFetching } = this.props;
        return (
            <div>
                {
                    isFetching && <h3>Loading..</h3>
                }
                <h1>{this.props.post.title}</h1>
                <div>
                    {
                        !isFetching && this.renderPost()
                    }
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    const { selectedArticle, articleFromFirebase } = state;
    const { slug, post } = selectedArticle;
    const { isFetching } = articleFromFirebase;
    return {
        slug,
        post,
        isFetching
    }
}
export default connect(mapStateToProps)(ArticlePage);