import { useEffect, useState } from "react";
import * as service from "../firebase/firebase.service";

const useFetchByID = (nameService, { id }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState();

  useEffect(() => {
    let isSubcribed = true;

    service
      .findById(nameService, id)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const value = snapshot.val();
          if (isSubcribed) {
            setData(value);
          }
          setIsLoading(false);
        } else {
          console.log("No data available");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setErrors(err);
      });

    return () => (isSubcribed = false);
  }, [id,nameService]);
  return [data, isLoading, errors];
};

export default useFetchByID;
