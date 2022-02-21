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
