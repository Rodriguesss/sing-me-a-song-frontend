import { useState, useEffect } from "react";

export default function useAsync(handler, immediate = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const act = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const response = await handler(...args);
      setData(response);
      setLoading(false);
      
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      setTimeout(() => {
        act();
      }, 1000);
    }
  }, []);

  return {
    data,
    loading,
    error,
    act
  };
}
