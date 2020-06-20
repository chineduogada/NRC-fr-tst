import { FETCH_OPTIONS_SUCCESS, SET_OPTIONS } from './actionTypes';
import httpService from '../../services/httpService';

export const setOptions = (payload) => {
  return {
    type: SET_OPTIONS,
    payload,
  };
};

export const fetchOptionsSuccess = (payload) => {
  return {
    type: FETCH_OPTIONS_SUCCESS,
    payload,
  };
};

export const fetchOptions = () => {
  return async (dispatch) => {
    try {
      const [
        departments,
        districts,
        bloodGroups,
        jobTypes,
        jobTitles,
        jobGrades,
        pfa,
        gpz,
        maritalStatuses,
        senatorialDistricts,
        states,
        lga,
        countries,
        sections,
        steps,
        genders,
        salaryStructures,
        employeeStatuses,
        careerReasonCodes,
        incidenceReasonCodes,
        incidenceDecisionCodes,
        qualifications,
        skills,
        relationshipTypes,
        trainingTypes,
      ] = await httpService.all([
        httpService.get('/departments'),
        httpService.get('/districts'),
        httpService.get('/blood-groups'),
        httpService.get('/job-types'),
        httpService.get('/job-titles'),
        httpService.get('/job-grades'),
        httpService.get('/pfa'),
        httpService.get('/gpz'),
        httpService.get('/marital-statuses'),
        httpService.get('/senatorial-districts'),
        httpService.get('/states'),
        httpService.get('/lga'),
        httpService.get('/countries'),
        httpService.get('/sections'),
        httpService.get('/steps'),
        httpService.get('/genders'),
        httpService.get('/salary-structures'),
        httpService.get('/employee-statuses'),
        httpService.get('/career-reason-codes'),
        httpService.get('/incidence-reason-codes'),
        httpService.get('/incidence-decision-codes'),
        httpService.get('/qualifications'),
        httpService.get('/skills'),
        httpService.get('/relationship-types'),
        httpService.get('/training-types'),
      ]);

      if (departments) {
        const options = {
          department: departments.data.data,
          district: districts.data.data,
          bloodGroup: bloodGroups.data.data,
          jobType: jobTypes.data.data,
          jobTitle: jobTitles.data.data,
          jobGrade: jobGrades.data.data,
          pfa: pfa.data.data,
          gpz: gpz.data.data,
          lga: lga.data.data,
          maritalStatus: maritalStatuses.data.data,
          senatorialDistrict: senatorialDistricts.data.data,
          state: states.data.data,
          country: countries.data.data,
          section: sections.data.data,
          step: steps.data.data,
          gender: genders.data.data,
          salaryStructure: salaryStructures.data.data,
          employeeStatus: employeeStatuses.data.data,
          careerReasonCode: careerReasonCodes.data.data,
          incidenceReasonCode: incidenceReasonCodes.data.data,
          incidenceDecisionCode: incidenceDecisionCodes.data.data,
          qualification: qualifications.data.data,
          skill: skills.data.data,
          relationshipType: relationshipTypes.data.data,
          trainingType: trainingTypes.data.data,
        };
        dispatch(fetchOptionsSuccess(options));
      }
    } catch (err) {
      console.log(err);
    }
  };
};
