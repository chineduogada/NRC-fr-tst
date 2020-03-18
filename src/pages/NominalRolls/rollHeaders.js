export const useSingleHeader = (accessor, header) => {
  return [
    { accessor, Header: header },
    { accessor: 'count', Header: 'Number of employees' }
  ];
};

export const useNestedHeader = (mainHeader, nestedHeader, nestedAccessor) => {
  return [
    {
      Header: mainHeader,
      columns: [{ accessor: nestedAccessor, Header: nestedHeader }]
    },
    { accessor: 'count', Header: 'Number of employees' }
  ];
};
