export const toFormatDate = (date) => {
  const theDate = new Date(date);
  return theDate.toUTCString();
};

export const convertToArrayObj = (obj) => {
  let result = [];
  for (let key in obj) {
    const newObj = {
      ...obj[key],
      key: key,
    };
    result.push(newObj);
  }
  return result;
};

export const generateKey = (values) => {
  let generatedKey;
  const length = values.length;

  if (values.length < 1 || values === undefined || values === null) {
    generatedKey = Math.floor(Math.random() * 1000);
  } else {
    generatedKey = length + Math.floor(Math.random() * 10000) * length;
  }

  for (let i in values) {
    if (values[i].key === generatedKey) {
      generateKey(values);
    }
  }

  console.log(generatedKey);

  return generatedKey;
};

export const validateForm = (formValues) => {
  for (let key in formValues) {
    for (let nestedKey in formValues[key]) {
      const nestedElement = formValues[key][nestedKey];
      if (
        nestedElement === undefined ||
        nestedElement === "" ||
        nestedElement === null
      ) {
        throw Error(`Value ${nestedKey} is undefined`);
      }
    }
  }
  return true;
};
