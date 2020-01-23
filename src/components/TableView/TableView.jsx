import React from 'react';
import classes from './TableView.module.scss';
import Button from '../Button/Button';
import ReactTable from '../ReactTable/Table';
import PageNotice from '../PageNotice/PageNotice';

const TableView = ({
  title,
  message,
  data,
  onPageChange,
  currentPage,
  clickHandler,
  columns,
  useLinks,
  addNewButtonHandler
}) => {
  return (
    <section className={classes.TableView}>
      <header>
        <div className="d-flex justify-content-between">
          <div>
            <div className="title text-capitalize">
              <h2 className={classes.TableTitle}>{title}</h2>
            </div>
            {message ? <PageNotice>{message}</PageNotice> : null}
          </div>
          <div className="buttons">
            <Button label="add new" fill onClick={addNewButtonHandler} />
            <Button label="export" />
          </div>
        </div>
      </header>

      <ReactTable columns={columns} data={data} clickHandler={clickHandler} />
    </section>
  );
};

export default TableView;
