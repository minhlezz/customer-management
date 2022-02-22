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
  const length = values.length;
  const generatedKey = length + Math.floor(Math.random()*10000)*length;
  for(let i in values) {
    if(values[i].key === generatedKey) {
      generateKey(values)
    }
  }

  return generatedKey;
}
