import { useState } from "react";
import { api } from "../config/config";

const useSubmit = (url, method = "post") => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const submit = async (submitData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api({
        method,
        url,
        data: submitData,
      });
      setData(response.data);
      setLoading(false);
    } catch (error) {
      const errMsg = error?.response?.data?.message || "Internal Server Error";
      setError(errMsg);
      setLoading(false);
    }
  };

  return { loading, data, error, submit };
};

export default useSubmit;
