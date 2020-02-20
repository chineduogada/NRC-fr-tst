export const attatchName = (data, name) => {
  return data.map(row => (row.name = name));
};

export const sortArrayOfObjects = (data, targetKeyInArray, targetValue) => {
  // const targets = [];

  // for (const obj of data) {
  //   if (obj[targetKeyInArray] === 'others') {
  //   }
  // }
  return data.sort((a, b) => {
    if (a[targetKeyInArray] === targetValue) {
      return 1;
    } else {
      return -1;
    }
  });
};

export default async (data, options, targetKeyInRow, targetKeyInOption) => {
  return new Promise((resolve, reject) => {
    try {
      const mappedData = data.map(row => {
        const sourceValue = options.filter(
          option => option.id === row[targetKeyInRow]
        )[0];

        return {
          ...row,
          name: sourceValue ? sourceValue[targetKeyInOption] : 'others'
        };
      });

      resolve(sortArrayOfObjects(mappedData, 'name', 'others'));
    } catch (err) {
      reject(err);
    }
  });
};
