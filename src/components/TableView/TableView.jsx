import React, { Component } from 'react';
import { ExportToCsv } from 'export-to-csv';
import classes from './TableView.module.scss';
import Button from '../Button/Button';
import Printer from '../Printer/Printer';
import ReactTable from '../ReactTable/Table';
import PageNotice from '../PageNotice/PageNotice';
import slugify from '../../helpers/slugify';
import printJS from 'print-js';
import { toast } from 'react-toastify';

class TableView extends Component {
  constructor(props) {
    super(props);
    const { columns, data } = this.props;
    this.data = data || [];
    this.headers = this.mapHeadersForDownloads(columns);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleExport = this.handleExport.bind(this);
    this.handlePrint = this.handlePrint.bind(this);
  }
  /**
   * Maps headers to be compatible with the react-csv
   * @param { Array } headers the headers of the react table
   */
  mapHeadersForDownloads(headers) {
    const mappedHeaders = headers.map((header) => {
      return header.Header;
    });
    return mappedHeaders;
  }

  async handleFilter(rows) {
    this.data = this.prepareFilteredRowsFromReactTable(rows) || [];
  }

  prepareFilteredRowsFromReactTable(rows) {
    return rows.map((row) => row.values);
  }

  getCurrentDataState() {
    return this.data;
  }

  getFileName() {
    return `${slugify(this.props.title)}`;
  }

  handleExport() {
    if (this.data.length) {
      const csvExporter = new ExportToCsv({
        showLabels: true,
        showTitle: this.getFileName(),
        filename: this.getFileName(),
        headers: this.headers,
      });

      csvExporter.generateCsv(this.data);
    } else {
      toast.info('Unable to export empty datasets');
    }
  }

  groupDataByActiveReport(data, activeReport) {
    const result = {};

    data.forEach((row) => {
      const instance = row[activeReport];
      if (result[instance]) {
        result[instance] += 1;
        return;
      }

      result[instance] = 1;
    });

    return result;
  }

  getSummary(data) {
    const { activeReport } = this.props;
    let summary = '';

    if (activeReport) {
      const groupedData = this.groupDataByActiveReport(data, activeReport);
      Object.keys(groupedData).forEach((group) => {
        summary += `${group}: ${groupedData[group]}; `;
      });
    }

    return summary;
  }

  handlePrint() {
    const { columns, activeReport, activeReportTitle } = this.props;
    const { data } = this;

    const getProperties = (headers = []) => {
      return headers.map(({ accessor, Header }) => {
        return {
          field: accessor,
          displayName: Header,
        };
      });
    };

    const styles = {
      gridHeaderStyle: 'color: #2a2a2a;  border: 2px solid #058f43;',
      gridStyle: 'border: 2px solid #2a2a2a; padding: 1px',
    };

    const header = `
      <div className={classes.Brand}>
        <div className={classes.Logo}></div>
        <h2>PRM</h2>
      </div>
      
      ${
        activeReport
          ? `<div className='report-summary' style='margin-bottom: 2em;'>
              <div>
                <h4 style='margin-bottom: none; margin-right: 0.5em; display: inline;'>Summary:</h4>
                <span style='text-decoration: underline; font-size: 1.4rem'>${activeReportTitle} (Total count: ${
              data.length
            })</span>
              </div>
              <p style='text-transform: capitalize;'>${
                this.getSummary(data) || ''
              }</p>
              <hr />
            </div>`
          : ''
      }
      `;

    printJS({
      header,
      documentTitle: 'Employees Report',
      printable: data,
      properties: getProperties(columns),
      type: 'json',
      ...styles,
    });
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
      enablePrint,
      addNewButtonHandler,
    } = this.props;

    return (
      <section className={classes.TableView}>
        <header>
          <div className="d-flex justify-content-between">
            <div>
              {title ? (
                <div className="title text-capitalize">
                  <h2 className={classes.TableTitle}>{title}</h2>
                </div>
              ) : null}
              {message ? <PageNotice>{message}</PageNotice> : null}
            </div>
            <div className="d-fle buttons">
              {addNewButtonHandler ? (
                <Button label="add new" fill onClick={addNewButtonHandler} />
              ) : null}
              {enablePrint ? (
                <Button label="print" fill onClick={this.handlePrint} />
              ) : null}
              <Button label="export" plain onClick={this.handleExport} />
            </div>
          </div>
        </header>

        <ReactTable
          onFilter={this.handleFilter}
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
