const domain = "http://localhost:1337/classes";
const URL = (nameService) => {
  return `${domain}/${nameService}`;
};

const urlById = (nameService, { id }) => {
  return `${domain}/${nameService}/${id}`;
};
const postAPI = (nameService, bodyData) => {
  const url = URL(nameService);
  return fetch(url, {
    headers: {
      "X-Parse-Application-Id": "myAppId",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
    method: "POST",
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

  return fetch(url, {
    method: "PUT",
    body: JSON.stringify(bodyData),
    headers: {
      "Content-Type": "application/json",
      "X-Parse-Application-Id": "myAppId",
    },
  }).then((data) => data.json());
};

const fetchAPI = (nameService, bodyData, { method }) => {
  console.log(method);
  const url = URL(nameService);
  const options =
    method === "GET"
      ? method
      : {
          method,
          body: JSON.stringify(bodyData),
        };
  return fetch(url, {
    headers: {
      "X-Parse-Application-Id": "myAppId",
      "Content-Type": "application/json",
    },
    ...options,
  }).then((data) => data.json());
};
export { getAPI, postAPI, getDataById, updateDataById, fetchAPI };
