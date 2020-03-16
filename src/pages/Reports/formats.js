const base = [
  { accessor: 'id', Header: 'IPPIS No' },
  { accessor: 'lastName', Header: 'Last Name' },
  { accessor: 'firstName', Header: 'First Name' },
  { accessor: 'initials', Header: 'Initials' },
  { accessor: 'gender', Header: 'Gender' },
  { accessor: 'salaryStructure', Header: 'salary structure' },
  { accessor: 'presentJobGrade', Header: 'Grade Level' },
  { accessor: 'presentPositionStep', Header: 'Step' }
];

const commonToFormatsA_B = [
  ...base,
  { accessor: 'department', Header: 'Department' },
  { accessor: 'presentJobTitle', Header: 'Present Job Title' }
];

const formatA = [
  ...commonToFormatsA_B,
  { accessor: 'dateOfBirth', Header: 'Date of Birth' },
  { accessor: 'resumptionDate', Header: 'Resumption date' },
  { accessor: 'expectedRetirementDate', Header: 'Expected Retirement date' }
];

const formatB = [
  ...commonToFormatsA_B,
  { accessor: 'district', Header: 'District' }
];

const formatC = [
  ...base,
  { accessor: 'gpz', Header: 'GPZ' },
  { accessor: 'state', Header: 'State' },
  { accessor: 'senatorialDistrict', Header: 'Senatorial District' },
  { accessor: 'lga', Header: 'LGA' }
];

export default {
  formatA,
  formatB,
  formatC
};
