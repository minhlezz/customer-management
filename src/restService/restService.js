const domain =
  "https://store-application-7e974-default-rtdb.asia-southeast1.firebasedatabase.app";

const URL = (nameService) => {
  return `${domain}/${nameService}.json`;
};

const urlById = (nameService, { id }) => {
  return `${domain}/${nameService}/${id}.json`;
};
const postAPI = (nameService, bodyData) => {
  const url = URL(nameService);
  const data = {
    ...bodyData,
    createdAt: {
      ".sv": "timestamp",
    },
  };
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
};

const getAPI = (nameService) => {
  const url = URL(nameService);
  return fetch(url).then((data) => data.json());
};

const getDataById = (nameService, { id }) => {
  const url = urlById(nameService, { id });
  return fetch(url).then((data) => data.json());
};

const updateDataById = (nameService, { id, bodyData }) => {
  const url = urlById(nameService, { id });
  const data = {
    ...bodyData,
    updatedAt: {
      ".sv": "timestamp",
    },
  };

  return fetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
};

export { getAPI, postAPI, getDataById, updateDataById };
