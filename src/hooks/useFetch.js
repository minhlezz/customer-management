import { useEffect, useState } from "react";
const domain = "http://localhost:1337/parse/classes";

const useFetch = (nameService) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState();
  const URL = `${domain}/${nameService}`;

  useEffect(() => {
    let mounted = true;
    setIsLoading(true)
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
          const { results } = data;
          setData(results);
        });
    } catch (error) {
      setErrors(error.message);
      setIsLoading(false)

    }
    setIsLoading(false)
    return () => {
      mounted = false;
    };
  }, [nameService]);

  return [data, isLoading, errors, setData];
};

export default useFetch;
