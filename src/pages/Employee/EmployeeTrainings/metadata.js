/**
 * @fileoverview Contains information for rendering training schedules
 * and training records of a single employee
 */

export default {
  columns: {
    records: [
      { accessor: 'tYear', Header: 'TYear' },
      { accessor: 'ippisNo', Header: 'IPPSI No' },
      {
        accessor: (props) =>
          `${props.employee.firstName} ${props.employee.lastName}`,
        Header: 'Employee Name',
      },
      { accessor: 'trainingType.type', Header: 'Training Type' },
      { accessor: 'startDate', Header: 'Start Date' },
      { accessor: 'endDate', Header: 'End Date' },
      { accessor: 'residential', Header: 'Residential' },
      { accessor: 'individualActualCost', Header: 'Individual Actual Cost' },
      { accessor: 'trainingLocation', Header: 'Training Location' },
    ],
    schedules: [
      { accessor: 'lYear', Header: 'Leave Year' },
      { accessor: 'ippisNo', Header: 'IPPSI No' },
      {
        accessor: (props) =>
          `${props.employee.firstName} ${props.employee.lastName}`,
        Header: 'Employee Name',
      },
      { accessor: 'trainingType.type', Header: 'Training Type' },
      { accessor: 'resourceOrg', Header: 'Resource Org' },
      { accessor: 'residential', Header: 'Residential' },
      { accessor: 'approved', Header: 'Approved' },
      { accessor: 'objectiveMet', Header: 'Objective Met' },
    ],
  },

  baseUrlToFetchRows: {
    records: 'training-records',
    schedules: 'training-schedules',
  },

  baseRouteOnRowClick: {
    records: 'training-records',
    schedules: 'training-schedules',
  },
};
