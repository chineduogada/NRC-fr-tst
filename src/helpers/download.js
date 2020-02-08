// function useInstance(instance) {
//   const {
//     rows,
//     preFilteredFlatRows,
//     flatColumns,
//     flatHeaders,
//     disableExport,
//     exportedFileName
//   } = instance;

//   const exportData = ({ all = false } = {}) => {
//     const colHeader = flatColumns
//       .filter((col) => col.canExport && (all || col.isVisible))
//       .map((col) => ({ id: col.id, name: getColumnHeaderName(col) }));
//     if (colHeader.length === 0) {
//       console.warn('No exportable columns are available');
//     }
//     let exportableRows = rows;
//     if (all) {
//       exportableRows = preFilteredFlatRows;
//     }
//     const data = exportableRows.map((row) => {
//       return colHeader.map((col) => row.values[col.id]);
//     });
//     const headerNames = colHeader.map((col) => col.name);
//     const exportData = { fields: headerNames, data };
//     const fileType = 'csv';
//     const fileName = typeof exportedFileName === 'function' ? exportedFileName(fileType, all) : exportedFileName;
//     downloadFile({ data: exportData, fileName, type: fileType });
//   };

//   flatHeaders.forEach((column) => {
//     const { disableExport: columnDisableExport, accessor } = column;
//     const canExport = accessor
//       ? getFirstDefined(
//           columnDisableExport === true ? false : undefined,
//           disableExport === true ? false : undefined,
//           true
//         )
//       : false;
//     column.canExport = canExport;
//   });
//   Object.assign(instance, {
//     exportData
//   });
// }
