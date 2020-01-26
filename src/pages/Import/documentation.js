export default JSON.stringify({
  BloodGroup: {
    name: 'blood groups',
    notes:
      'Import a list of blood groups. Please, ensure that the headers of your file follow the schema below',
    schema: {
      type: '<string>'
    },
    example: [
      {
        type: 'A+'
      },
      {
        type: 'O-'
      }
    ]
  },

  Department: {
    name: 'departments',
    notes:
      'Import a list of departments. Please, ensure that the headers of your file follow the schema below',
    schema: {
      code: '<string>',
      description: '<string>'
    },
    example: [
      {
        code: 'FIN',
        description: 'finance'
      },
      {
        code: 'ENG',
        description: 'engineering'
      }
    ]
  }
});
