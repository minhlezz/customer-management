import { useEffect, useState } from "react";
const domain =
  "https://store-application-7e974-default-rtdb.asia-southeast1.firebasedatabase.app";
const useFetchDataById = (nameService, { id }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${domain}/${nameService}/${id}.json`);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchHandler();
  }, [id, nameService]);

  return [data, isLoading, error];
};

export default useFetchDataById;
