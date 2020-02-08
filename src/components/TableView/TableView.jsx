import React, { Component } from 'react';
import classes from './TableView.module.scss';
import Button from '../Button/Button';
import ReactTable from '../ReactTable/Table';
import PageNotice from '../PageNotice/PageNotice';

class TableView extends Component {
  componentDidMount() {
    console.log(this.reactTable);
  }

  render() {
    const {
      title,
      message,
      data,
      onPageChange,
      currentPage,
      clickHandler,
      rowOptions,
      onRowOptionChange,
      columns,
      useLinks,
      addNewButtonHandler
    } = this.props;

    return (
      <section className={classes.TableView}>
        {title ? (
          <header>
            <div className='d-flex justify-content-between'>
              <div>
                <div className='title text-capitalize'>
                  <h2 className={classes.TableTitle}>{title}</h2>
                </div>
                {message ? <PageNotice>{message}</PageNotice> : null}
              </div>
              <div className='buttons'>
                <Button label='add new' fill onClick={addNewButtonHandler} />
                <Button label='export' plain />
              </div>
            </div>
          </header>
        ) : null}

        <ReactTable
          ref={reactTable => (this.reactTable = reactTable)}
          columns={columns}
          data={data}
          clickHandler={clickHandler}
          rowOptions={rowOptions}
          onRowOptionChange={onRowOptionChange}
        />
      </section>
    );
  }
}

export default TableView;
