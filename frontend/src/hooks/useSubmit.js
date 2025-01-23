import { useState } from "react";
import { api } from "../config/config";

const useSubmit = (url, method = "post") => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const submit = async (submitData) => {
    setLoading(true);
    try {
      const response = await api({
        method,
        url,
        data: submitData,
      });
      setData(response.data);
    } catch (error) {
      const errMsg = error?.response?.data?.message || "Internal Server Error";
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, submit };
};

export default useSubmit;
