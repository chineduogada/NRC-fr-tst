import Joi from 'joi-browser';

export default {
  departmentId: Joi.number().required(),
  sectionId: Joi.number().required(),
  jobTitleId: Joi.number().required(),
  employeeCount: Joi.number().required(),
  reportTo: Joi.number().required(),
  basicQualId: Joi.number().required(),
  basicSkillId: Joi.number().required(),
  basicTrainingId: Joi.number().required(),
  yearsOfExp: Joi.number().required(),
  otherQualifications: Joi.allow([]).optional(),
  otherSkills: Joi.allow([]).optional(),
  otherTrainings: Joi.allow([]).optional(),
  otherRequirement: Joi.string()
    .allow('')
    .optional(),
  otherRequirement1: Joi.string()
    .allow('')
    .optional(),
  otherRequirement2: Joi.string()
    .allow('')
    .optional()
};
