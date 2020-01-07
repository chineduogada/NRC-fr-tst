import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from '../../Dropdown/Dropdown';
import classes from './Card.module.css';

const card = props => {
  const cardImgDiv =
    props.url !== undefined ? (
      <div className={classes.CardImage}>
        <img src={props.url} alt="" />
      </div>
    ) : null;

  const cardText =
    props.article !== undefined ? (
      <div className={classes.CardText}>
        <p>{props.article}</p>
      </div>
    ) : null;

  // Format time
  let dt = new Date(props.createdOn);
  let timestamp = `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`;

  // Check Post Type and get the generate the post path
  const postType = props.url !== undefined ? 'gifs' : 'articles';
  const postPath = `${postType}/${props.id}`; // This will be used to get a single post detail from the API

  return (
    <article id={props.id} className={classes.Card}>
      {/* Card Header */}
      <section className={classes.CardHeader}>
        <div className={classes.UserAndTimeStamp}>
          {/* Card Author */}
          <Link to={`/users/${props.authorId}`}>
            <div className={classes.Author}>
              <div className={classes.AuthorImage}>
                <img src={props.avatar} alt={props.authorName} />
              </div>
              <span className={classes.AuthorName}>{props.authorName}</span>
            </div>
          </Link>

          {/* Timestamp */}
          <div className={classes.TimeStamp}>{timestamp}</div>
        </div>

        {/* Dropdown menu */}
        <Dropdown
          items={[
            { name: 'report', to: `/${postType}/${props.id}/report` },
            { name: 'edit', to: `/${postType}/${props.id}/edit` },
            { name: 'delete', to: `/${postType}/${props.id}/delete` }
          ]}
        />
      </section>

      <Link to={postPath}>
        <section className={classes.CardBody}>
          {/* Card Title */}
          <h3 className={classes.Title}>{props.title}</h3>

          {/* Card Image if exists*/}
          {cardImgDiv}

          {/* Card Text if exists*/}
          {cardText}
        </section>
      </Link>

      {/* Card Footer */}
      <section className={classes.CardFooter}>
        <p className={classes.CardTag}>trending</p>
      </section>
    </article>
  );
};

export default card;
