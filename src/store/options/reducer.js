import { FETCH_OPTIONS_SUCCESS, SET_OPTIONS } from './actionTypes';

const yesOrNo = [
  { id: 'Y', name: 'Yes' },
  { id: 'N', name: 'No' },
];

const initialState = {
  optionsFetched: false,
  gender: [],
  bloodGroup: [],
  maritalStatus: [],
  lga: [],
  gpz: [],
  state: [],
  senatorialDistrict: [],
  country: [],
  pfa: [],
  department: [],
  section: [],
  district: [],
  jobType: [],
  jobTitle: [],
  jobGrade: [],
  step: [],
  trainingType: [],
  relationshipType: [],
  careerReasonCode: [],
  incidenceReasonCode: [],
  incidenceDecisionCode: [],
  skill: [],
  qualification: [],
  salaryStructure: [],
  employeeStatus: [],
  pensionable: yesOrNo,
  beneficiary: yesOrNo,
  professional: yesOrNo,
  residential: yesOrNo,
  accepted: yesOrNo,
  status: [
    { id: 1, status: 'active' },
    { id: 2, status: 'inactive' },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OPTIONS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        optionsFetched: true,
      };
    case SET_OPTIONS:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
