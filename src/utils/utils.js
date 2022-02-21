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

export const generateKeyObj = (arrayObj) => {
  let result;
  let duplicate;
  const arrObj = arrayObj;
  const length = arrObj.length;
  result = Math.floor(Math.random() * 1000 + length);
  for (let key in arrObj) {
    if (arrObj[key] === result) {
      duplicate = true;
    } else {
      duplicate = false;
    }
  }

  if (duplicate) {
    generateKeyObj(arrObj);
  }

  return result;
};
