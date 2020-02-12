/**
 *
 * @param { Array } arrayOfFieldValues an array of numbers where the numbers are
 * a foreign key of foreign keys pointing to rows in the `Skills`, `TrainingTypes`
 * or `Qualifications` table.
 * @param { String } requirement an optional (extra) requirement for the succession.
 * One of `skillId`, `TrainingTypeId` or `QualificationId`
 * @param { Number } successionId a id of the newly created succession
 * @returns { Array } an array of objects in which each object contains
 * the `successionId` field and one of the additional requirement fields (eg.
 * `skillId` or `QualificationId`)
 */
const prepareOptionalRequirements = (
  arrayOfFieldValues,
  requirement,
  successionId
) => {
  return arrayOfFieldValues.map(value => {
    return {
      successionId,
      [requirement]: value
    };
  });
};

export default prepareOptionalRequirements;
