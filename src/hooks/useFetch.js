import { useEffect, useState } from "react";
import * as service from "../firebase/firebase.service";

const useFetch = (nameService) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState();

  useEffect(() => {
    let isSubcribed = true;
    let result = [];
    service
      .findAll(nameService)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const values = snapshot.val();
          for (let key in values) {
            result.push({
              id: key,
              ...values[key],
            });
          }
          if (isSubcribed) {
            setData(result);
          }
          setIsLoading(false);
        } else {
          console.log("No data available");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setErrors(error);
      });
    return () => (isSubcribed = false);
  }, [nameService]);

  return [data, isLoading, errors];
};

export default useFetch;
