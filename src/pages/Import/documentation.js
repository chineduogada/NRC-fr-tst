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
  },

  Employee: {
    name: 'employees',
    notes:
      'Import a list of employee primary data. Please, ensure that the headers of your excel sheet follow the column arrangement below:',
    schema: {
      A: 'IPPIS  number <number>',
      B: 'surname <string>',
      C: 'first name <string>',
      D: 'middlenames <string>',
      E: 'initials <string>',
      F: 'NRC number <number>',
      G: 'date of birth <date>',
      H: 'gender <string>',
      I: 'nationality <string>',
      J: 'country of birth <string>',
      K: 'phone number <number>',
      L: 'email <string>',
      M: 'blood group <string>',
      N: 'marital status <string>',
      O: 'senatorial district <string>',
      P: 'state <string>',
      Q: 'LGA <string>',
      R: 'PFA <string>',
      S: 'PFA number <number>',
      T: 'professional <string>'
    },
    example: [
      {
        A: 12345,
        B: 'Peter',
        C: 'Emeka',
        D: 'Ayo',
        E: 'Mr',
        F: 3453,
        G: '02/05/1984',
        H: 'Male',
        I: 'Nigeria',
        J: 'France',
        K: '071111111',
        L: 'employee@mail.com',
        M: 'O+',
        N: 'single',
        O: 'South East',
        P: 'Anambra',
        Q: 'Anambra East',
        R: 'ARM Pension Managers',
        S: 678776,
        T: 'Y'
      }
    ]
  }
});
