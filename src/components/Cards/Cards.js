import React from 'react';
import Card from './Card/Card';
import classes from './Cards.module.css';

const Cards = (props) => {
  // Loop through the data set render card
  return (
    <div className={classes.Cards}>
      {props.data.map((d, i) => (
        <Card
        key={i}
        id={d.id}
        url={d.url}
        title={d.title}
        article={d.article}
        authorId={d.authorId}
        authorName={`${d.firstName} ${d.lastName}`}
        avatar={d.avatar}
        createdOn={d.createdOn}/>
      )
      )}
    </div>
  );
};

export default Cards;
