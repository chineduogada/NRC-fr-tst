import React, { Component } from 'react';
import { CSVLink } from 'react-csv';
import { ExportToCsv } from 'export-to-csv';
import classes from './TableView.module.scss';
import Button from '../Button/Button';
import ReactTable from '../ReactTable/Table';
import PageNotice from '../PageNotice/PageNotice';
import slugify from '../../helpers/slugify';

class TableView extends Component {
  constructor(props) {
    super(props);
    const { columns, data } = this.props;
    this.data = data;
    this.headers = this.mapHeadersForDownloads(columns);

    this.handleFilter = this.handleFilter.bind(this);
    this.handleExport = this.handleExport.bind(this);
  }
  /**
   * Maps headers to be compatible with the react-csv
   * @param { Array } headers the headers of the react table
   */
  mapHeadersForDownloads(headers) {
    const mappedHeaders = headers.map(header => {
      return header.Header;
    });

    return mappedHeaders;
  }

  async handleFilter(rows) {
    this.data = this.prepareFilteredRowsFromReactTable(rows);
  }
  
  prepareFilteredRowsFromReactTable(rows) {
    return rows.map(row => row.values);
  }
  
  getCurrentDataState() {
    return this.data;
  }
  
  getFileName() {
    return `${slugify(this.props.title)}`;
  }
  
  handleExport() {
    console.log('filtered data', this.headers, this.data);

    const csvExporter = new ExportToCsv({
      showLabels: true,
      filename: this.getFileName(),
      headers: this.headers
    });

    csvExporter.generateCsv(this.data);
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
            <div className="d-flex justify-content-between">
              <div>
                <div className="title text-capitalize">
                  <h2 className={classes.TableTitle}>{title}</h2>
                </div>
                {message ? <PageNotice>{message}</PageNotice> : null}
              </div>
              <div className="buttons">
                <Button label="add new" fill onClick={addNewButtonHandler} />
                <Button label="export" plain onClick={this.handleExport} />
              </div>
            </div>
          </header>
        ) : null}

        <ReactTable
          onFilter={this.handleFilter}
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
