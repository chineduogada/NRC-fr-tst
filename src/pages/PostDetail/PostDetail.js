import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Section from '../../hoc/Section/Section';
import Comments from '../../components/Comments/Comments';
import Loader from '../../components/Loader/Loader';
import classes from './PostDetail.module.css';

class PostDetail extends Component {
  constructor(props) {
    super(props);

    this.commentFieldValue = {};

    this.pathName = this.props.location.pathname;

    this.getCommentValue = this.getCommentValue.bind(this);
    this.postComment = this.postComment.bind(this);
  }

  state = {
    commentInputElement: null,
    post: null,
    comments: [],
    postedComment: null, // This will hold the returned comment when a comment is successfully posted
  }

  // get the post from the server (including any comment on the given post)
  async componentDidMount() {
    const res = await axios.get(this.props.location.pathname);

    const { data } = res.data;
    // Upadate `post` state
    this.setState({ post: data, comments: [...data.comments] });

  }

  getCommentValue({ target }) {
    const { id, value } = target;

    this.commentFieldValue[id] = value;

    // store the comment input field
    // so that we can erase empty the box after posting comment
    this.setState({ commentInputElement: target });
  }

  async postComment() {
    console.log(this.props);
    if (Object.keys(this.commentFieldValue).length) {

      console.log('posting');

      try {
        const res = await axios.post(`${this.pathName}/comments`, this.commentFieldValue);

        const { data } = res.data;
        const oldCommentsState = [...this.state.comments];

        // Update the number of comments on the UI
        this.setState({
          comments: [data, ...oldCommentsState],
        });

        // Also, reset the commentInputField
        const commentInputElement = this.state.commentInputElement;
        commentInputElement.value = '';
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    console.log(this.state.comments);
    const { post } = this.state;
    if (!post) {
      return <Loader />
    }

    const postImage = post.imageUrl ? (
      <div className={classes.PostImage}>
        <img src={post.imageUrl} alt={post.title}></img>
      </div>) : null;

const postText = post.article ? (
      <div className={classes.PostText}>
        <p>{post.article}</p>
      </div>) : null;

return (
  <div className={classes.PostDetail}>
        <header className={classes.Header}>
          <h1 className={classes.PostTitle}>{post.title}</h1>
        </header>

        <section className={classes.Body}>
          {/* Post Image if it exists */}
          {postImage}

          {/* Post Text if it exists */}
          {postText}
        </section>

        <Section title={`Comments (${this.state.comments.length})`} className={classes.PostComments}>
          <Comments blurred={this.getCommentValue}
            clicked={this.postComment}
            comments={this.state.comments} />
        </Section>

      </div>
    );
  }
}


export default withRouter(PostDetail);
