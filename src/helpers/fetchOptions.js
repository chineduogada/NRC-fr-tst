import httpService from '../services/httpService';
import { setOptions } from '../store/options/actionCreators';
import { useDispatch } from 'react-redux';

export default async () => {
  const dispatch = useDispatch();

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
  ] = await httpService.all([
    httpService.get('/departments?statusId=1'),
    httpService.get('/districts?statusId=1'),
    httpService.get('/blood-groups'),
    httpService.get('/job-types?statusId=1'),
    httpService.get('/job-titles?statusId=1'),
    httpService.get('/job-grades'),
    httpService.get('/pfa?statusId=1'),
    httpService.get('/gpz'),
    httpService.get('/marital-statuses'),
    httpService.get('/senatorial-districts'),
    httpService.get('/states'),
    httpService.get('/lga'),
    httpService.get('/countries'),
    httpService.get('/sections?statusId=1'),
    httpService.get('/steps'),
    httpService.get('/genders'),
    httpService.get('/salary-structures'),
    httpService.get('/employee-statuses'),
  ]);

  if (departments) {
    dispatch(
      setOptions({
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
      })
    );
  }
};
