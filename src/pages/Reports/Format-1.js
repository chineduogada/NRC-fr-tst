const base = [
  { accessor: 'id', Header: 'IPPIS No' },
  { accessor: 'nrcNo', Header: 'NRC No' },
  { accessor: 'lastName', Header: 'Last Name' },
  { accessor: 'fisrtName', Header: 'First Name' },
  { accessor: 'initials', Header: 'Initials' },
  { accessor: 'gender', Header: 'Gender' },
  { accessor: 'salaryStructure', Header: 'salary structure' },
  { accessor: 'presentPositionGrade', Header: 'Grade Level' },
  { accessor: 'presentPositionStep', Header: 'Step' }
];

export const formatA = [
  ...base,
  { accessor: 'dateOfBirth', Header: 'Date of Birth' },
  { accessor: 'resumptionDate', Header: 'Resumption date' },
  { accessor: 'expectedRetirementDate', Header: 'Expected Retirement date' }
];

export const formatB = [
  ...base,
  { accessor: 'presentPositionStep', Header: 'Step' },
  { accessor: 'presentJobTitle', Header: 'Present Job Title' }
];
