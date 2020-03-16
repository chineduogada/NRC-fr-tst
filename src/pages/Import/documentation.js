export default JSON.stringify({
  BloodGroup: {
    name: 'blood groups',
    notes:
      'Import a list of blood groups. Please, ensure that the headers of your file follow the schema below',
    schema: {
      A: 'type <string>'
    },
    example: [
      {
        A: 'A+'
      },
      {
        A: 'O-'
      }
    ]
  },

  Department: {
    name: 'departments',
    notes:
      'Import a list of departments. Please, ensure that the headers of your file follow the schema below',
    schema: {
      A: 'code <string>',
      below: 'description <string>'
    },
    example: [
      {
        A: 'FIN',
        B: 'finance'
      },
      {
        A: 'ENG',
        B: 'engineering'
      }
    ]
  },

  State: {
    name: 'states',
    schema: { A: 'state <string>' },
    notes:
      'Please, ensure that the headers of your excel sheet follow the column arrangement below:',
    example: {
      A: 'Lagos'
    }
  },

  LGA: {
    name: 'local government areas',
    schema: {
      A: 'lga <string>',
      B: 'state <string>'
    },
    notes:
      'This requires that the state table has been populated! Please, ensure that the headers of your excel sheet follow the column arrangement below:',
    example: {
      A: 'Ojo',
      B: 'Lagos'
    }
  },

  SenatorialDistrict: {
    name: 'senatorial districts',
    schema: { A: 'name <string>' },
    notes:
      'Please, ensure that the headers of your excel sheet follow the column arrangement below:',
    example: {
      A: 'Anioma north'
    }
  },

  District: {
    name: 'districts',
    schema: {
      A: 'site code <string>',
      B: 'site name <string>',
      C: 'address <string>'
    },
    notes:
      'Please, ensure that the headers of your excel sheet follow the column arrangement below:',
    example: {
      A: 'HQ',
      B: 'head quarters',
      C: 'abule ado, lagos'
    }
  },

  SalaryStructure: {
    name: 'salary structures',
    schema: { A: 'code <number>', B: 'description <string>' },
    notes:
      'Please, ensure that the headers of your excel sheet follow the column arrangement below:',
    example: {
      A: 1,
      B: 'CONHSS'
    }
  },

  JobGrade: {
    name: 'job grades',
    schema: { A: 'con <number>', B: 'conpss <number>' },
    notes:
      'Please, ensure that the headers of your excel sheet follow the column arrangement below:',
    example: {
      A: 1,
      B: 1
    }
  },

  JobTitle: {
    name: 'job titles',
    schema: { A: 'code <string>', B: 'description <string>' },
    notes:
      'Please, ensure that the headers of your excel sheet follow the column arrangement below:',
    example: {
      A: 'MD',
      B: 'managing director'
    }
  },

  JobType: {
    name: 'job types',
    schema: { A: 'type <string>' },
    notes:
      'Please, ensure that the headers of your excel sheet follow the column arrangement below:',
    example: {
      A: 'NYSC'
    }
  },

  PFA: {
    name: 'pension fund administrators',
    schema: { A: 'name <string>' },
    notes:
      'Please, ensure that the headers of your excel sheet follow the column arrangement below:',
    example: {
      A: 'IBTC Pension Managers'
    }
  },

  Skill: {
    name: 'skills',
    schema: { A: 'skill <string>' },
    notes:
      'Please, ensure that the headers of your excel sheet follow the column arrangement below:',
    example: {
      A: 'communication'
    }
  },

  Qualification: {
    name: 'qualifications',
    schema: { A: 'qualification <string>' },
    notes:
      'Please, ensure that the headers of your excel sheet follow the column arrangement below:',
    example: {
      A: 'BSc'
    }
  },

  CareerReasonCode: {
    name: 'career reason codes',
    schema: { A: 'code <string>' },
    notes:
      'Please, ensure that the headers of your excel sheet follow the column arrangement below:',
    example: {
      A: 'promotion'
    }
  },

  IncidenceReasonCode: {
    name: 'incidence reason codes',
    schema: { A: 'code <string>' },
    notes:
      'Please, ensure that the headers of your excel sheet follow the column arrangement below:',
    example: {
      A: 'stealing'
    }
  },

  MaritalStatus: {
    name: 'marital statuses',
    schema: { A: 'status <string>' },
    notes:
      'Please, ensure that the headers of your excel sheet follow the column arrangement below:',
    example: {
      A: 'married'
    }
  },

  // Country: {
  //   schema: { A: 'code <string>', B: 'country <string>' }
  // },

  GPZ: {
    name: 'geo-political zones',
    schema: { A: 'code <string>', B: 'description <string>' },
    notes:
      'Please, ensure that the headers of your excel sheet follow the column arrangement below:',
    example: {
      A: 'SW',
      B: 'south west'
    }
  },

  RelationshipType: {
    name: 'relationship types',
    schema: { A: 'type <string>' },
    notes:
      'Please, ensure that the headers of your excel sheet follow the column arrangement below:',
    example: {
      A: 'son'
    }
  },

  TrainingType: {
    name: 'training types',
    schema: { A: 'type <string>' },
    notes:
      'Please, ensure that the headers of your excel sheet follow the column arrangement below:',
    example: {
      A: 'e-learning'
    }
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
      F: 'date of birth <date>',
      G: 'gender <string>',
      H: 'nationality <string>',
      I: 'country of birth <date>',
      J: 'phone number <number>',
      K: 'email <string>',
      L: 'blood group <string>',
      M: 'marital status <string>',
      N: 'gpz <string>',
      O: 'senatorial district <string>',
      P: 'state <string>',
      Q: 'LGA <string>',
      R: 'PFA <string>',
      S: 'PFA number <number>',
      T: 'professional <string>',
      U: 'address'
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
        P: 'Anambra East',
        Q: 'Anambra',
        R: 'Anambra East',
        S: 'ARM Pension Managers',
        T: 678776,
        U: 'Y',
        V: 'Lagos'
      }
    ]
  },
  EmployeeJob: {
    name: 'employee job details',
    notes:
      'Import a list of employee primary data. Please, ensure that the headers of your excel sheet follow the column arrangement below:',
    schema: {
      A: 'IPPIS number <number>',
      B: 'department <string>',
      C: 'section <number>',
      D: 'employeeStatus <string>',
      E: 'district <string>',
      F: 'reportTo (IPPIS no) <number> NOT REQUIRED',
      G: 'location <string>',
      H: 'pensionable <string>',
      I: 'salaryStructure <string>'
    },
    example: [
      {
        A: '12345',
        B: 'Finance',
        C: 14,
        D: 'active',
        E: 'HQ',
        F: '123456',
        G: 'Lagos',
        H: 'Y',
        I: 'CONHSS'
      }
    ]
  },

  EmployeeAppointment: {
    name: 'employee appointment details',
    notes:
      'Import a list of employee primary data. Please, ensure that the headers of your excel sheet follow the column arrangement below:',
    schema: {
      A: 'IPPIS number <number>',
      B: 'first Appointment Date <date>',
      C: 'first Appointment Job Type <string>',
      D: 'firstAppointment Job Title <string>',
      E: 'first Appointment Grade <number>',
      F: 'first Appointment Step <number>',
      G: 'confirmation Date <date>',
      H: 'resumption Date <date>',
      I: 'present Appointment Date <date>',
      J: 'present Position Job Type <string>',
      K: 'present Position Job Title <string>',
      L: 'present Position Grade <number>',
      M: 'present Position Step <number>'
    },
    example: [
      {
        A: '12345',
        B: '01-01-1990',
        C: 'NYSC',
        D: 'Assistant Secretary',
        E: 4,
        F: 1,
        G: '01-02-1990',
        H: '08-02-1990',
        I: '01-01-1991',
        J: 'Permanent',
        K: 'MD',
        L: 12,
        M: 10
      }
    ]
  }
});
