export const toFormatDate = (date) => {
  const theDate = new Date(date);
  return theDate.toUTCString();
};
