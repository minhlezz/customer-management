import { useEffect, useState } from "react";
const domain = "http://localhost:1337/parse/classes";

const useFetchByID = (nameService, { id }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState();
  const URL = `${domain}/${nameService}/${id}`;
  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    try {
      fetch(URL, {
        headers: {
          "X-Parse-Application-Id": "myAppId",
          "Content-Type": "application/json",
        },
        method: "GET",
      })
        .then((data) => data.json())
        .then((data) => {
          setData(data);
        });
    } catch (error) {
      setErrors(error.message);
      setIsLoading(false);
    }
    setIsLoading(false);
    return () => {
      mounted = false;
    };
  }, [id, nameService]);

  const updateData = (value) => {
    setData(value);
  };

  return [data, isLoading, errors, updateData];
};

export default useFetchByID;
