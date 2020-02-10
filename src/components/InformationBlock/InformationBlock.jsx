import React from 'react';
import { MdArrowDownward } from 'react-icons/md';
import classes from './InformationBlock.module.scss';

export default function InformationBlock({
  title,
  subTitle,
  children,
  showDropDown
}) {
  return (
    <section className='sect'>
      <div className={classes.TitleWrapper}>
        {title ? <h6 className={classes.Title}>{title}</h6> : null}
        {showDropDown ? <MdArrowDownward className='icon' /> : null}
      </div>
      {subTitle ? <p className={classes.SubTitle}>{subTitle}</p> : null}
      {children ? <div className={classes.InfoBlock}>{children}</div> : null}
    </section>
  );
}
