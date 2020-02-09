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

export const mapForReactSelect = arrayOfOptions => {
  return arrayOfOptions.map(option => {
    return {
      value: option.id,
      label: option.name
    };
  });
};

export default nameMapper;
