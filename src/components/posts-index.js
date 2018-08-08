import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchPosts} from '../actions';
import _ from 'lodash';

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts(props) {
    return _.map(this.props.posts, post => {
      return (
        <div className="card mb-5" key={post.id}>
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <Link to = {`/posts/${post.id}`} className="btn btn-primary">Read More</Link>
          </div>
        </div>
      );
    });
  }

  render(){
    return (
      <div>
        <div className = "text-xs float-right">
          <Link className = "btn btn-primary" to = "/posts/new">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
          {this.renderPosts()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {posts: state.posts};
}

export default connect(mapStateToProps, {fetchPosts})(PostsIndex);
