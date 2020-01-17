const propFinder = (obj, props) => {
  return props.reduce((a, b, i) => {
    return i === 1 ? obj[a][b] : a[b];
  });
};

const mapper = (obj, keys) => {
  const props = keys.split('.');
  let prop;

  if (props.length > 1) {
    prop = propFinder(obj, props);
  } else {
    prop = obj[props[0]];
  }

  return {
    id: obj.id,
    name: prop
  };
};

const nameMapper = (array, key) => {
  return array.map(item => mapper(item, key));
};

export default nameMapper;

// Array of departments fetched from the API
const departments = [
  {
    id: 5,
    description: {
      type: 'finance'
    },
    code: 'FIN'
  },
  {
    id: 4,
    description: {
      type: 'support'
    },
    code: 'CS'
  }
];

// A mock of your "renderSelect method"
const renderSelect = (label, name, options) => {
  console.log(options);
};

// EXAMPLES: (Utilizing the "nameMapper" helper function)
renderSelect('label', 'sjdsk', nameMapper(departments, 'description.type'));
renderSelect('label', 'sjdsk', nameMapper(departments, 'description.type'));

// **** Console logs from the "renderSelect" function **** //
// [ { id: 5, name: 'finance' }, { id: 4, name: 'support' } ]
// [ { id: 5, name: 'finance' }, { id: 4, name: 'support' } ]
