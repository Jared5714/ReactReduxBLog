import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component {

  // Render field helper function
  renderField(field) {
    const {meta: {touched, error}} = field;
    const className = `form-control ${touched && error ? 'is-invalid' : ''}`;

    return (
      <div className = 'form-group'>
        <label>{field.label}</label>
        <input
          className = {className}
          type = "text"
          {...field.input}
        />
        <div className = 'text-danger'>
          {touched ? error : ''}
        </div>
      </div>
    );
  }
  // Form on submit helper function
  onSubmit(values){
    this.props.createPost(values, () => {this.props.history.push('/');});
  }

  render(){
    const {handleSubmit} = this.props;
    return(
        <form onSubmit = {handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label = "Title"
            name = "title"
            component = {this.renderField}
          />
          <Field
            label = "categories"
            name = "categories"
            component = {this.renderField}
          />
          <Field
            label = "Content"
            name = "content"
            component = {this.renderField}
          />
          <button type = 'submit' className = 'btn btn-primary mr-2'>Submit</button>
          <Link to = '/' className = 'btn btn-danger'>Cancel</Link>
        </form>
    );
  }
}

// Validate form helper function
function validate(values){
    const errors = {};

    if(!values.title){
      errors.title = 'Please enter a title!';
    }
    if(!values.categories){
      errors.categories = 'Please enter a tag!';
    }
    if(!values.content){
      errors.content = 'Please enter some content!';
    }
    return errors;
}

export default reduxForm({
  form: 'PostsNewForm',
  validate
})(
  connect(null, {createPost})(PostsNew)
);
