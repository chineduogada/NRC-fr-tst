import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Comment.module.css';

const comment = (props) => {
  return (
    <article className={classes.Comment}>
      <p>{props.children}</p>

      <div className={classes.Footer}>
        <Link to={`/users/${props.authorId}`}>
          <div className={classes.Author}>
            <div className={classes.AuthorImage}>
              <img src={props.avatar} alt={props.authorName} />
            </div>
            <span className={classes.AuthorName}>{props.authorName}</span>
          </div>
        </Link>
        <p className={classes.Timestamp}>{props.timestamp}</p>
      </div>
    </article>
  );
};

export default comment;
