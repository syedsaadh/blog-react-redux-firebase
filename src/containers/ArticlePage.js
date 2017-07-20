import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as markdown from 'markdown-it';
import renderHtml from 'react-render-html';
var md = new markdown({
    html: true,
  linkify: true,
  typographer: true
})
class ArticlePage extends Component{
    renderPost(){
        return renderHtml(md.render(this.props.post.desc || 'Select a Article'));
    }
    render(){
        console.log(this.props)
        return(
            <div>    
                <h1>{this.props.post.title}</h1>
                <div>
                    { this.renderPost()}
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    const { selectedArticle } = state;
    const { slug, post } = selectedArticle;

    return {
        slug, 
        post
    }
}
export default connect(mapStateToProps)(ArticlePage);