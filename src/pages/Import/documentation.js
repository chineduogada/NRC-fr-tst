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
      'Please, ensure that the headers of your excel sheet follow the column arrangement below:',
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
      F: 'NRC number <number>',
      G: 'date of birth <date>',
      H: 'gender <string>',
      I: 'nationality <string>',
      J: 'country of birth <date>',
      K: 'phone number <number>',
      L: 'email <string>',
      M: 'blood group <string>',
      N: 'marital status <string>',
      O: 'gpz <string>',
      P: 'senatorial district <string>',
      Q: 'state <string>',
      R: 'LGA <string>',
      S: 'PFA <string>',
      T: 'PFA number <number>',
      U: 'professional <string>',
      V: 'address'
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
    schema: {
      A: 'IPPIS number <number>',
      B: 'firstAppointmentDate <date>',
      C: 'firstAppointmentJobType <string>',
      D: 'firstAppointmentJobTitle <string>',
      E: 'firstAppointmentGrade <number>',
      F: 'firstAppointmentStep <number>',
      G: 'confirmationDate <date>',
      I: 'presentAppointmentDate <date>',
      J: 'presentPositionJobType <string>',
      K: 'presentPositionJobTitle <string>',
      L: 'presentPositionGrade <number>',
      M: 'presentPositionStep <number>'
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
      I: '01-01-1991',
      J: 'Permanent',
      K: 'MD',
      L: 12,
      M: 10
      }
    ]
  }
});
