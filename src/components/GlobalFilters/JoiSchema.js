import Joi from 'joi-browser';

export default {
  genderId: Joi.array()
    .allow([], '')
    .optional(),
  stateId: Joi.array()
    .allow([], '')
    .optional(),
  lgaId: Joi.array()
    .allow([], '')
    .optional(),
  gpzId: Joi.array()
    .allow([], '')
    .optional(),
  senatorialDistrictId: Joi.array()
    .allow([], '')
    .optional(),
  departmentId: Joi.array()
    .allow([], '')
    .optional(),
  districtId: Joi.array()
    .allow([], '')
    .optional(),
  employeeStatusId: Joi.array()
    .allow([], '')
    .optional(),
  salaryStructureId: Joi.array()
    .allow([], '')
    .optional(),
  presentPositionJobTitleId: Joi.array()
    .allow([], '')
    .optional(),
  presentPositionJobTypeId: Joi.array()
    .allow([], '')
    .optional(),
  presentPositionGradeId: Joi.array()
    .allow([], '')
    .optional(),
  presentPositionStepId: Joi.array()
    .allow([], '')
    .optional(),
  expectedRetirementDate: Joi.array()
    .allow([], '')
    .optional(),
  dateOfBirth: Joi.array()
    .allow([], '')
    .optional(),
  resumptionDate: Joi.array()
    .allow([], '')
    .optional()
};
