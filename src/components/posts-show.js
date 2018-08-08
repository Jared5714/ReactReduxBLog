import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost, deletePost} from '../actions';
import {Link} from 'react-router-dom';

class PostsShow extends Component {
  componentDidMount(){
    const {id} = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick(){
    const {id} = this.props.match.params;
    this.props.deletePost(id, () => {this.props.history.push('/');});
  }

  render(){

    const {post} = this.props;

    if(!post){
      return <div>Loading...</div>;
    }

    return (
      <div className = 'container mt-5'>
        <Link to = "/" className = "btn btn-warning mb-5">Back to Posts</Link>
        <button
          className = 'btn btn-danger float-right'
          onClick = {this.onDeleteClick.bind(this)}
          >
          Delete
        </button>
        <h1>{post.title}</h1>
        <pre>Catergories: {post.categories}</pre>
        <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps({posts}, ownProps){
  return {post: posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow);
