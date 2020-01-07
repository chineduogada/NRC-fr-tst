import React from 'react';
import classes from './Comments.module.css';
import Comment from './Comment/Comment';
import InputField from '../InputField/InputField';
import Button from '../../components/Button/Button';

const Comments = props => {
  return (
    <div className={classes.Comments}>
      {/* Comment Input Field */}
      <div className={classes.CommentBox}>
        <InputField
          id="comment"
          blurred={props.blurred}
          augmentedClassName={classes.Input}
          type="textarea"
        />
        <Button clicked={props.clicked}>Comment</Button>
      </div>

      {/* List of comments */}
      <div className={classes.CommentList}>
        {props.comments.map((comment, i) => {
          const { createdOn } = comment;
          const ts = new Date(createdOn); // ts = timestamp
          let formatedTS = `${ts.getDate()}/${ts.getMonth() +
            1}/${ts.getFullYear()}`;
          formatedTS += `   ${ts.getHours()}:${ts.getMinutes()}`;

          return (
            <Comment
              key={i}
              timestamp={formatedTS}
              authorId={comment.authorId}
              authorName={`${comment.firstName} ${comment.lastName}`}
              avatar={comment.avatar}
            >
              {comment.comment}
            </Comment>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
