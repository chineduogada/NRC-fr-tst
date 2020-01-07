import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Section from '../../hoc/Section/Section';
// import Modal from '../Modal/Modal';
import Button from '../../components/Button/Button';
import classes from './DeletePost.module.css';


class DeletePost extends Component {
  constructor(props) {
    super(props);
    // const { id, postType } = this.props;
    this.deletePostHandler = this.deletePostHandler.bind(this);
    this.cancelDeleteHandler = this.cancelDeleteHandler.bind(this);

    const pathnameDestructure = this.props.location.pathname.split('/');
    this.postType = pathnameDestructure[1];
    this.postId = pathnameDestructure[2] * 1; // a trick to convert string to number

    this.state = {
      redirect: false,
    }
  }

  async deletePostHandler(event) {
    try {
      const res = await axios.delete(`/${this.postType}/${this.postId}`);

      console.log(res);

      // Set Redirect state to 'true' to send the user back to the Home page
      this.setState({ redirect: true });

    } catch ({ response }) {
      // const { status, error } = response.data;
      console.log(response);
    }
  }

  cancelDeleteHandler() {
    // Set Redirect state to 'true' to send the user back to the Home page
    this.setState({ redirect: true });
  }

  render () {
    return (
      <Section title='Delete Post'>
        {/* Redirect to Home page after delete/cancel */}
        {this.state.redirect ? <Redirect to='/' /> : null}

        <p>Are you sure you want to delete this post?</p>
  
        <div className={classes.Buttons}>
          <Button styleType={`${classes.Button} dead`} clicked={this.cancelDeleteHandler}>Cancel</Button>
          <Button styleType='danger' clicked={this.deletePostHandler}>Delete</Button>
        </div>
      </Section>
    );
  }
};

export default DeletePost;
