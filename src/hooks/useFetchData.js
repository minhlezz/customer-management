import React, { useEffect, useState } from "react";
import { getAPI } from "../restService/restService";

const useFetchData = (nameService) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    getAPI(nameService)
      .then((data) => {
        if (mounted) {
          const listData = Object.keys(data).map((key) => {
            return {
              ...data[key],
              uniqueId: key,
            };
          });
          setData(listData);
        }
      })
      .catch((errors) => {
        setError(errors);
      });
    setIsLoading(false);
    return () => {
      mounted = false;
    };
  }, []);

  return [data, isLoading, error];
};

export default useFetchData;
