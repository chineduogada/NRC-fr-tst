import React from 'react';
import classes from './TableView.module.scss';
import Button from '../Button/Button';
import Searchbox from '../Searchbox/Searchbox';
import Filter from '../Filter/Filter';
import Pagination from '../Pagination/Pagination';
// import Table from "../Table/Table";
import ReactTable from '../ReactTable/Table';
import { Link } from 'react-router-dom';

const TableView = ({
  title,
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
        <div className='d-flex justify-content-between'>
          <div className='title text-capitalize'>
            <h2 className={classes.TableTitle}>{title}</h2>
          </div>
          <div className='buttons'>
            <Button label='add new' fill onClick={addNewButtonHandler} />
            <Button label='export' />
          </div>
        </div>
      </header>

      <ReactTable columns={columns} data={data} clickHandler={clickHandler} />
    </section>
  );
};

export default TableView;
